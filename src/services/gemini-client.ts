/* eslint-disable no-unused-vars */
type ServerMessageType =
  | "INPUT_TRANSCRIPT"
  | "OUTPUT_TRANSCRIPT"
  | "AUDIO_CHUNK"
  | "TURN_COMPLETE"
  | "INTERRUPT"
  | "ERROR";

interface ServerMessage {
  type: ServerMessageType;
  data: any;
}

type WSOpenHandler = (ev: Event) => void;
type WSCloseHandler = (ev: CloseEvent) => void;
type WSErrorHandler = (ev: Event) => void;
type AudioHandler = (base64Audio: string) => void;
type TextHandler = (text: string) => void;
type VoidHandler = () => void;

// ===== 1) Gemini API 통신 클래스 =====
export class GeminiAPI {
  private endpoint: string;
  private ws: WebSocket | null;
  private reconnectAttempts: number;
  private readonly maxReconnectAttempts: number;
  private readonly reconnectDelay: number;
  private isManualDisconnect: boolean;

  public onOpen: WSOpenHandler = () => {};
  public onClose: WSCloseHandler = () => {};
  public onError: WSErrorHandler = () => {};
  public onAudio: AudioHandler = () => {};
  public onInputTranscript: TextHandler = () => {};
  public onOutputTranscript: TextHandler = () => {};
  public onTurnComplete: VoidHandler = () => {};
  public onInterrupt: VoidHandler = () => {};

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    this.isManualDisconnect = false;
  }

  public connect(): void {
    this.isManualDisconnect = false;
    this.ws = new WebSocket(this.endpoint);
    this.setupWebSocketHandlers();
  }

  private setupWebSocketHandlers(): void {
    if (!this.ws) return;

    this.ws.onopen = (event: Event) => {
      console.log("WebSocket 연결 성공");
      this.reconnectAttempts = 0;
      this.onOpen(event);
    };

    this.ws.onmessage = (event: MessageEvent<string>) => {
      try {
        const payload: ServerMessage = JSON.parse(event.data);
        this.handleServerMessage(payload);
      } catch (error) {
        console.error("메시지 파싱 오류:", error);
      }
    };

    this.ws.onclose = (event: CloseEvent) => {
      console.log("웹소켓 연결이 종료되었습니다.", event.reason);
      this.onClose(event);

      if (!this.isManualDisconnect && event.code !== 1000) {
        console.log("예상치 못한 연결 종료, 재연결 시도");
        this.reconnect();
      }
    };

    this.ws.onerror = (error: Event) => {
      console.error("웹소켓 오류:", error);
      this.onError(error);
    };
  }

  private handleServerMessage(payload: ServerMessage): void {
    switch (payload.type) {
      case "INPUT_TRANSCRIPT":
        this.onInputTranscript(String(payload.data ?? ""));
        break;

      case "OUTPUT_TRANSCRIPT":
        this.onOutputTranscript(String(payload.data ?? ""));
        break;

      case "AUDIO_CHUNK":
        this.onAudio(String(payload.data ?? ""));
        break;

      case "TURN_COMPLETE":
        this.onTurnComplete();
        break;

      case "INTERRUPT":
        this.onInterrupt();
        break;

      case "ERROR":
        console.error("서버 에러:", payload.data);
        this.onError(new Event("server-error"));
        this.close();
        break;

      default:
        console.warn("지원하지 않는 메시지 타입:", payload);
    }
  }

  private reconnect(): void {
    if (
      this.isManualDisconnect ||
      this.reconnectAttempts >= this.maxReconnectAttempts
    )
      return;

    this.reconnectAttempts++;
    console.log(
      `재연결 시도 ${this.reconnectAttempts}/${this.maxReconnectAttempts}`,
    );

    setTimeout(
      () => this.connect(),
      this.reconnectDelay * this.reconnectAttempts,
    );
  }

  public sendAudio(audioBuffer: ArrayBuffer): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(audioBuffer);
    }
  }

  public close(): void {
    this.isManualDisconnect = true;
    if (this.ws) this.ws.close();
  }
}

// ===== 2) 오디오 스트리밍 재생 클래스 =====
export class StreamingAudioPlayer {
  private sampleRate: number;
  private audioContext: AudioContext | null;
  private audioQueue: Float32Array[];
  private isPlaying: boolean;
  private nextPlayTime: number;
  private activeSources: AudioBufferSourceNode[];

  constructor(sampleRate: number) {
    this.sampleRate = sampleRate;
    this.audioContext = null;
    this.audioQueue = [];
    this.isPlaying = false;
    this.nextPlayTime = 0;
    this.activeSources = [];
  }

  private ensureAudioContext(): void {
    const AC: typeof AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!this.audioContext || this.audioContext.state === "closed") {
      this.audioContext = new AC({ sampleRate: this.sampleRate });
      this.nextPlayTime = this.audioContext.currentTime;
    }
    if (this.audioContext.state === "suspended") {
      void this.audioContext.resume();
    }
  }

  public receiveAudio(base64Audio: string): void {
    this.ensureAudioContext();

    const binaryString = atob(base64Audio);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);

    const int16Array = new Int16Array(bytes.buffer);
    const float32Array = new Float32Array(int16Array.length);
    for (let i = 0; i < int16Array.length; i++) {
      float32Array[i] = int16Array[i] / 32768.0;
    }

    this.audioQueue.push(float32Array);

    if (!this.isPlaying) {
      this.isPlaying = true;
      this.scheduleNextChunk();
    }
  }

  private scheduleNextChunk(): void {
    if (this.audioQueue.length === 0) {
      this.isPlaying = false;
      return;
    }

    if (!this.audioContext || this.audioContext.state === "closed") {
      console.log("오디오 컨텍스트 재생성 시도");
      this.ensureAudioContext();
      if (!this.audioContext || this.audioContext.state === "closed") {
        console.error("오디오 컨텍스트 복구 실패");
        this.isPlaying = false;
        return;
      }
    }

    const audioChunk = this.audioQueue.shift() as Float32Array;
    const buffer = this.audioContext.createBuffer(
      1,
      audioChunk.length,
      this.sampleRate,
    );

    buffer.getChannelData(0).set(audioChunk);

    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioContext.destination);

    const currentTime = this.audioContext.currentTime;
    const scheduleTime =
      this.nextPlayTime < currentTime ? currentTime : this.nextPlayTime;

    source.start(scheduleTime);
    this.nextPlayTime = scheduleTime + buffer.duration;

    this.activeSources.push(source);
    source.onended = () => {
      this.activeSources = this.activeSources.filter(s => s !== source);
      if (this.isPlaying) this.scheduleNextChunk();
    };

    (source as any).onerror = (error: unknown) => {
      console.error("오디오 소스 에러:", error);
      this.activeSources = this.activeSources.filter(s => s !== source);
      if (this.isPlaying) this.scheduleNextChunk();
    };
  }

  public interrupt(): void {
    console.log("오디오 재생 중단 및 버퍼 비우기");
    this.isPlaying = false;
    this.audioQueue = [];

    this.activeSources.forEach(source => {
      try {
        source.stop(0);
      } catch {
        console.error("오디오 소스 중단 실패:", source);
      }
    });
    this.activeSources = [];

    if (this.audioContext) {
      this.nextPlayTime = this.audioContext.currentTime;
    }
  }

  public stop(): void {
    this.interrupt();
    if (this.audioContext && this.audioContext.state !== "closed") {
      this.audioContext.close().catch(console.error);
      this.audioContext = null;
    }
  }
}

// ===== 3) 마이크 입력 처리 클래스 =====
export class Microphone {
  private sampleRate: number;
  private onAudioCallback: (audioBuffer: ArrayBuffer) => void;
  private mediaStream: MediaStream | null;
  private audioContext: AudioContext | null;
  private processor: ScriptProcessorNode | null;

  constructor(
    sampleRate: number,
    onAudioCallback: (audioBuffer: ArrayBuffer) => void,
  ) {
    this.sampleRate = sampleRate;
    this.onAudioCallback = onAudioCallback;
    this.mediaStream = null;
    this.audioContext = null;
    this.processor = null;
  }

  public async start(): Promise<void> {
    const AC: typeof AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;

    this.audioContext = new AC({ sampleRate: this.sampleRate });
    this.mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const source = this.audioContext.createMediaStreamSource(this.mediaStream);
    // ScriptProcessor는 deprecated지만 간단 구현용으로 그대로 사용
    this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);

    this.processor.onaudioprocess = (e: AudioProcessingEvent) => {
      const inputData = e.inputBuffer.getChannelData(0);
      const int16Array = new Int16Array(inputData.length);
      for (let i = 0; i < inputData.length; i++) {
        const s = Math.max(-1, Math.min(1, inputData[i]));
        int16Array[i] = s * 32767;
      }
      this.onAudioCallback(int16Array.buffer);
    };

    source.connect(this.processor);
    this.processor.connect(this.audioContext.destination);
  }

  public stop(): void {
    if (this.mediaStream) this.mediaStream.getTracks().forEach(t => t.stop());
    if (this.processor) {
      this.processor.disconnect();
      this.processor = null;
    }
    if (this.audioContext && this.audioContext.state !== "closed") {
      this.audioContext.close();
    }
    this.audioContext = null;
    this.mediaStream = null;
  }
}

// ===== 4) 메인 애플리케이션 로직 (바닐라 페이지용) =====
const connectBtn = document.getElementById(
  "connectBtn",
) as HTMLButtonElement | null;
const disconnectBtn = document.getElementById(
  "disconnectBtn",
) as HTMLButtonElement | null;
const statusDiv = document.getElementById("status") as HTMLDivElement | null;
const transcriptsDiv = document.getElementById(
  "transcripts",
) as HTMLDivElement | null;

const SERVER_URL = "ws://localhost:8765/ws/realtime";
const SEND_SAMPLE_RATE = 16000;
const RECEIVE_SAMPLE_RATE = 24000;

let geminiApi: GeminiAPI | null = null;
let microphone: Microphone | null = null;
let audioPlayer: StreamingAudioPlayer | null = null;
let accessToken: string | null = null;

// 토큰은 로컬스토리지에서 가져오기
function getAccessTokenFromStorage(): string | null {
  const token = localStorage.getItem("accessToken");
  return token && token.trim() !== "" ? token.trim() : null;
}

// DOM이 있는 페이지에서만 버튼 핸들러 연결
if (connectBtn && disconnectBtn && statusDiv && transcriptsDiv) {
  connectBtn.addEventListener("click", async () => {
    connectBtn.disabled = true;
    statusDiv.textContent = "서버 상태 확인 중...";

    statusDiv.textContent = "토큰 확인 중...";
    accessToken = getAccessTokenFromStorage();
    if (!accessToken) {
      updateStatus("❌ accessToken이 필요합니다 (localStorage)", "#f8d7da");
      connectBtn.disabled = false;
      return;
    }

    statusDiv.textContent = "연결 중...";
    transcriptsDiv.innerHTML = "";

    audioPlayer = new StreamingAudioPlayer(RECEIVE_SAMPLE_RATE);
    geminiApi = new GeminiAPI(SERVER_URL);
    setupApiCallbacks(geminiApi);

    microphone = new Microphone(SEND_SAMPLE_RATE, audioBuffer => {
      geminiApi?.sendAudio(audioBuffer);
    });

    try {
      geminiApi.connect();
      await microphone.start();
    } catch (error: any) {
      console.error("연결 또는 마이크 시작 중 오류:", error);
      updateStatus(`❌ 오류: ${error?.message ?? "unknown"}`, "#f8d7da");
      stopAll();
    }
  });

  disconnectBtn.addEventListener("click", () => {
    geminiApi?.close();
  });
}

function setupApiCallbacks(api: GeminiAPI): void {
  api.onOpen = () => {
    updateStatus("✅ 연결됨 및 녹음 중...", "#d4edda");
    if (disconnectBtn) disconnectBtn.disabled = false;
  };

  api.onClose = (event: CloseEvent) => {
    const reason = event.reason || "알 수 없는 이유";
    const code = event.code || 0;
    console.log(`연결 종료: 코드 ${code}, 이유: ${reason}`);

    if (code === 1008) {
      updateStatus("❌ 인증 실패로 연결이 끊어졌습니다", "#f8d7da");
    } else if (code === 1011) {
      updateStatus("❌ 서버 내부 오류로 연결이 끊어졌습니다", "#f8d7da");
    } else {
      updateStatus(`🔌 연결 끊김 (${reason})`, "#fff3cd");
    }
    stopAll();
  };

  api.onError = (error: Event) => {
    console.error("WebSocket 오류:", error);
    updateStatus("❌ 웹소켓 오류 발생", "#f8d7da");
    stopAll();
  };

  api.onAudio = (base64: string) => audioPlayer?.receiveAudio(base64);
  api.onInputTranscript = (text: string) =>
    appendTranscript(text, "사용자", "user-transcript");
  api.onOutputTranscript = (text: string) =>
    appendTranscript(text, "AI", "ai-transcript");

  api.onTurnComplete = () => {
    console.log("대화 턴 완료.");
    const lastElement = transcriptsDiv?.lastElementChild as HTMLElement | null;
    if (lastElement) lastElement.dataset.final = "true";
  };

  api.onInterrupt = () => {
    console.log("오디오 중단 처리");
    audioPlayer?.interrupt();
  };
}

function stopAll(): void {
  microphone?.stop();
  audioPlayer?.stop();
  if (connectBtn) connectBtn.disabled = false;
  if (disconnectBtn) disconnectBtn.disabled = true;
}

function updateStatus(message: string, color: string): void {
  if (!statusDiv) return;
  statusDiv.textContent = message;
  statusDiv.style.backgroundColor = color;
}

function appendTranscript(
  text: string,
  speaker: string,
  className: string,
): void {
  if (!transcriptsDiv) return;

  const lastElement = transcriptsDiv.lastElementChild as HTMLElement | null;
  if (
    lastElement &&
    lastElement.className.includes(className) &&
    lastElement.dataset.final !== "true"
  ) {
    const textNode = lastElement.querySelector(".text") as HTMLElement | null;
    if (textNode) textNode.textContent += text;
  } else {
    if (lastElement) lastElement.dataset.final = "true";
    const wrapper = document.createElement("div");
    wrapper.className = `transcript-wrapper ${className}`;
    wrapper.innerHTML = `<span class="transcript-label">${speaker}</span><p class="text">${text}</p>`;
    transcriptsDiv.appendChild(wrapper);
  }
  transcriptsDiv.scrollTop = transcriptsDiv.scrollHeight;
}
