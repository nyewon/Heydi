/*
 * Loading - 로딩 화면
 *
 * 세부사항:
 * - 로딩 중인 상태 표시
 */

import { Container } from "@components/index";
import { BounceLoader } from "react-spinners";

type LoadingProps = {
  type?: "default" | "diary";
};

const Loading = ({ type = "default" }: LoadingProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[100svh]">
      <Container>
        <div className="flex flex-col items-center gap-4">
          <BounceLoader size={56} color="#B28C7E" speedMultiplier={1} />

          {type === "diary" && (
            <p className="text-xs font-medium text-[#76615A] text-center">
              일기를 생성 중이에요!
              <br />
              1~3분 소요될 수 있어요😊
            </p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Loading;
