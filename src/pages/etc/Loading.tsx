/*
 * Loading - 로딩 화면
 *
 * 세부사항:
 * - 로딩 중인 상태 표시
 */

import { Container } from "@components/index";

const Loading = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <Container>
        <h1 className="text-4xl font-bold text-black">Loading</h1>
      </Container>
    </div>
  );
};

export default Loading;
