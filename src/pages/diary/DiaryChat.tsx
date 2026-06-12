/*
 * DiaryChat - 일기 대화 중 화면
 *
 * 세부사항:
 * - 현재 날짜와 대화 경과 시간 표시
 * - 대화 종료하기 버튼 클릭 시 일기 메인 페이지로 이동
 * - 정식 연결 전 WebSocket을 통해 GeminiAPI와 실시간 음성 대화 처리 (임시. 추후 수정 예정)
 * - 세션 종료 api 임시 연결
 */

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackHeader, Container, Button, VoiceWave } from "@components/index";
import { getFormattedDate, formatElapsedTime } from "@/utils/date";
import { useAudioStream } from "@hooks/useAudioStream";
import {
  GeminiAPI,
  StreamingAudioPlayer,
  Microphone,
} from "@services/gemini-client";
import { endConversationSession } from "@services/diary";
import { Loading } from "@pages/etc";

const WS_SCHEME = window.location.protocol === "https:" ? "wss" : "ws";
const WS_HOST =
  import.meta.env.VITE_WEBSOCKET_URL?.replace(/^https?:\/\//, "") ||
  "api.example.com";
const WS_PATH = "/ws/conversations";

const SEND_SAMPLE_RATE = 16000;
const RECEIVE_SAMPLE_RATE = 24000;

type Message = {
  speaker: "user" | "assistant";
  text: string;
  final?: boolean;
};

const DiaryChat = () => {
  const navigate = useNavigate();
  const { diaryId } = useParams<{ diaryId: string }>();

  const [today, setToday] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isSpeaking = useAudioStream();

  const geminiRef = useRef<GeminiAPI | null>(null);
  const micRef = useRef<Microphone | null>(null);
  const playerRef = useRef<StreamingAudioPlayer | null>(null);

  useEffect(() => {
    setToday(getFormattedDate());
  }, []);

  useEffect(() => {
    if (!isConnected) return;

    const id = setInterval(() => {
      setElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [isConnected]);

  useEffect(() => {
    if (!diaryId) return;

    let cancelled = false;

    const socketUrl = `${WS_SCHEME}://${WS_HOST}${WS_PATH}?diaryId=${diaryId}`;

    const start = async () => {
      playerRef.current = new StreamingAudioPlayer(RECEIVE_SAMPLE_RATE);

      geminiRef.current = new GeminiAPI(socketUrl);

      micRef.current = new Microphone(SEND_SAMPLE_RATE, audioBuffer => {
        geminiRef.current?.sendAudio(audioBuffer);
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

      api.onServerError = error => {
        console.error("서버 에러:", error);

        if (error.code === "401") {
          alert("인증이 만료되었습니다.");
          navigate("/login");
          return;
        }

        if (error.code === "409") {
          alert("이미 오늘 작성된 일기가 존재합니다.");
          navigate("/diary");
          return;
        }

        alert(error.message ?? "알 수 없는 오류가 발생했습니다.");
      };

      api.onInputTranscript = text => {
        appendMessage(text, "user");
      };

      api.onOutputTranscript = text => {
        appendMessage(text, "assistant");
      };

      api.onInputTurnCommitted = () => {
        finalizeLast("user");
      };

      api.onTurnComplete = () => {
        finalizeLast("assistant");
      };

      api.onAudio = base64 => {
        playerRef.current?.receiveAudio(base64);
      };

      api.onInterrupt = () => {
        playerRef.current?.interrupt();
      };

      try {
        api.connect();

        await micRef.current.start();
      } catch (error) {
        console.error(error);

        stopAll();
      }
    };

    start();

    return () => {
      cancelled = true;

      stopAll();
    };
  }, [diaryId, navigate]);

  if (isLoading) {
    return <Loading type="diary" />;
  }

  const appendMessage = (text: string, speaker: "user" | "assistant") => {
    setMessages(prev => {
      const copied = [...prev];

      for (let i = copied.length - 1; i >= 0; i--) {
        const target = copied[i];

        if (target.speaker === speaker && !target.final) {
          copied[i] = {
            ...target,
            text: target.text + text,
          };

          return copied;
        }
      }

      copied.push({
        speaker,
        text,
        final: false,
      });

      return copied;
    });
  };

  const finalizeLast = (speaker: "user" | "assistant") => {
    setMessages(prev => {
      const copied = [...prev];

      for (let i = copied.length - 1; i >= 0; i--) {
        const target = copied[i];

        if (target.speaker === speaker && !target.final) {
          copied[i] = {
            ...target,
            final: true,
          };

          break;
        }
      }

      return copied;
    });
  };

  const stopAll = () => {
    micRef.current?.stop();
    playerRef.current?.stop();
    geminiRef.current?.close();
  };

  const handleExitChat = async () => {
    try {
      setIsLoading(true);

      stopAll();

      if (!diaryId) return;

      const res = await endConversationSession(Number(diaryId));

      if (res.success) {
        navigate("/diary", {
          replace: true,
        });
      }
    } catch (error) {
      console.error("세션 종료 실패", error);
    } finally {
      setIsLoading(false);
    }
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
          className="w-full mt-12"
          onClick={handleExitChat}
        >
          대화 종료하기
        </Button>
      </Container>
    </div>
  );
};

export default DiaryChat;
