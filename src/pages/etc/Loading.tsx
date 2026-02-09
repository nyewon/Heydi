/*
 * Loading - 로딩 화면
 *
 * 세부사항:
 * - 로딩 중인 상태 표시
 */

import { Container } from "@components/index";
import { BounceLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[100svh]">
      <Container>
        <div className="flex flex-col items-center">
          <BounceLoader size={56} color="#B28C7E" speedMultiplier={1} />
        </div>
      </Container>
    </div>
  );
};

export default Loading;
