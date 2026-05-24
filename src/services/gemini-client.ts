/* eslint-disable no-unused-vars */

type ServerMessageType =
  | "INPUT_TRANSCRIPT"
  | "INPUT_TURN_COMMITTED"
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

type ServerErrorHandler = (error: any) => void;

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

  public onInputTurnCommitted: VoidHandler = () => {};

  public onOutputTranscript: TextHandler = () => {};

  public onTurnComplete: VoidHandler = () => {};

  public onInterrupt: VoidHandler = () => {};

  public onServerError: ServerErrorHandler = () => {};

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

      case "INPUT_TURN_COMMITTED":
        this.onInputTurnCommitted();
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

        this.onServerError(payload.data);

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
    ) {
      return;
    }

    this.reconnectAttempts++;

    console.log(
      `재연결 시도 ${this.reconnectAttempts}/${this.maxReconnectAttempts}`,
    );

    setTimeout(() => {
      this.connect();
    }, this.reconnectDelay * this.reconnectAttempts);
  }

  public sendAudio(audioBuffer: ArrayBuffer): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return;
    }

    this.ws.send(audioBuffer);
  }

  public close(): void {
    this.isManualDisconnect = true;

    if (this.ws) {
      this.ws.close();
    }
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
      this.audioContext = new AC({
        sampleRate: this.sampleRate,
      });

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

    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

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

      if (this.isPlaying) {
        this.scheduleNextChunk();
      }
    };

    (source as any).onerror = (error: unknown) => {
      console.error("오디오 소스 에러:", error);

      this.activeSources = this.activeSources.filter(s => s !== source);

      if (this.isPlaying) {
        this.scheduleNextChunk();
      }
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

    this.audioContext = new AC({
      sampleRate: this.sampleRate,
    });

    this.mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const source = this.audioContext.createMediaStreamSource(this.mediaStream);

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
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
    }

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
