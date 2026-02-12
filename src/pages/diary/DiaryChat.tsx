/*
 * DiaryChat - 일기 대화 중 화면
 *
 * 세부사항:
 * - 현재 날짜와 대화 경과 시간 표시
 * - 대화 종료하기 버튼 클릭 시 일기 메인 페이지로 이동
 * - 정식 연결 전 WebSocket을 통해 GeminiAPI와 실시간 음성 대화 처리 (임시. 추후 수정 예정)
 */

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackHeader, Container, Button, VoiceWave } from "@components/index";
import { getFormattedDate, formatElapsedTime } from "@/utils/date";
import { useAudioStream } from "@hooks/useAudioStream";
import {
  GeminiAPI,
  StreamingAudioPlayer,
  Microphone,
} from "@services/gemini-client";

const WS_SCHEME = window.location.protocol === "https:" ? "wss" : "ws";
const WS_HOST =
  import.meta.env.VITE_WEBSOCKET_URL?.replace(/^https?:\/\//, "") ||
  "api.example.com";
const WS_PATH = "/ws/conversations";
const SERVER_URL = `${WS_SCHEME}://${WS_HOST}${WS_PATH}`;

const SEND_SAMPLE_RATE = 16000;
const RECEIVE_SAMPLE_RATE = 24000;

type Message = {
  speaker: "user" | "assistant";
  text: string;
  final?: boolean;
};

const DiaryChat = () => {
  const navigate = useNavigate();

  const [today, setToday] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [, setIsConnected] = useState(false);
  const isSpeaking = useAudioStream();

  const geminiRef = useRef<GeminiAPI | null>(null);
  const micRef = useRef<Microphone | null>(null);
  const playerRef = useRef<StreamingAudioPlayer | null>(null);

  useEffect(() => {
    setToday(getFormattedDate());
    const id = setInterval(() => setElapsed(prev => prev + 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const start = async () => {
      playerRef.current = new StreamingAudioPlayer(RECEIVE_SAMPLE_RATE);
      geminiRef.current = new GeminiAPI(SERVER_URL);

      micRef.current = new Microphone(SEND_SAMPLE_RATE, ab => {
        geminiRef.current?.sendAudio(ab);
      });

      const api = geminiRef.current;

      api.onOpen = () => {
        if (cancelled) return;
        setIsConnected(true);
      };

      api.onClose = () => {
        if (cancelled) return;
        setIsConnected(false);
        stopAll();
      };

      api.onError = () => {
        if (cancelled) return;
        setIsConnected(false);
        stopAll();
      };

      api.onInputTranscript = text => appendMessage(text, "user");
      api.onOutputTranscript = text => appendMessage(text, "assistant");
      api.onTurnComplete = finalizeLast;
      api.onAudio = b64 => playerRef.current?.receiveAudio(b64);

      try {
        api.connect();
        await micRef.current.start();
      } catch {
        stopAll();
      }
    };

    start();
    return () => {
      cancelled = true;
      stopAll();
    };
  }, []);

  const appendMessage = (text: string, speaker: "user" | "assistant") => {
    setMessages(prev => {
      const last = prev[prev.length - 1];
      if (last && last.speaker === speaker && !last.final) {
        return [...prev.slice(0, -1), { ...last, text: last.text + text }];
      }
      return [...prev, { speaker, text }];
    });
  };

  const finalizeLast = () => {
    setMessages(prev =>
      prev.map((m, i) => (i === prev.length - 1 ? { ...m, final: true } : m)),
    );
  };

  const stopAll = () => {
    micRef.current?.stop();
    playerRef.current?.stop();
    geminiRef.current?.close();
  };

  const handleExitChat = () => {
    stopAll();
    navigate("/diary", { replace: true });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <BackHeader />

      <Container className="pt-4 pb-10">
        <div className="flex flex-col items-center text-center">
          <span className="text-2xl font-extrabold text-[#76615A] mt-5">
            {today}
          </span>

          <span className="text-sm font-bold text-[#76615A] mt-1">
            {formatElapsedTime(elapsed)}
          </span>
        </div>

        <div
          className="
            w-full bg-white rounded-xl shadow-[0_2px_6px_rgba(0,0,0,0.1)]
            border border-[#E0CFC5] p-4 mt-6
            h-[400px] overflow-y-auto
            scrollbar-none
            [&::-webkit-scrollbar]:hidden
          "
        >
          <div className="flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.speaker === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg text-xs leading-5 max-w-[70%] ${
                    msg.speaker === "user"
                      ? "bg-[#B28C7E] text-white rounded-br-none"
                      : "bg-[#EFE8E1] text-[#4A4A4A] rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isSpeaking && (
              <div className="flex justify-end">
                <div className="bg-[#B28C7E] rounded-lg p-2 w-[30%]">
                  <VoiceWave />
                </div>
              </div>
            )}
          </div>
        </div>

        <Button
          variant="full"
          className="w-full mt-17"
          onClick={handleExitChat}
        >
          대화 종료하기
        </Button>
      </Container>
    </div>
  );
};

export default DiaryChat;
