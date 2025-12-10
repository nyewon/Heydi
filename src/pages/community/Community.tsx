/*
 * Community - 커뮤니티 메인 화면
 *
 * 세부사항:
 * - CommunityCard 컴포넌트를 사용
 * - 게시글 클릭 시 해당 게시글 상세 페이지로 이동
 * - 더미 데이터로 커뮤니티 게시글 목록 표시
 */

import { useNavigate } from "react-router-dom";
import {
  Container,
  DefaultHeader,
  BottomNav,
  CommunityCard,
} from "@components/index";

const dummyPosts = [
  {
    writer: "Test",
    date: "2025.12.7",
    title: "일본 여행 1일차",
    emotion: "행복",
    topic: "여행",
    content:
      "오늘은 일본 여행 1일차예요. 아침 일찍 비행기를 타고 인천공항에서 간사이 공항으로 이동했어요. 오랜만에 하는 여행이라서 매우 설렜어요. 공항에 도착해서는 바로 숙소로 이동했어요. 숙소는 깔끔하고 아늑했어요. 짐을 풀고 나서는 근처 맛집을 찾아가서 점심을 먹었어요. 일본 음식은 역시 맛있었어요! 오후에는 유명한 관광지를 돌아다녔어요. 날씨도 좋아서 사진도 많이 찍었답니다. 저녁에는 현지 친구를 만나서 함께 저녁을 먹었어요. 오늘 하루 정말 알차고 즐거웠어요. 내일도 기대돼요!",
    likes: 32,
  },
  {
    writer: "Test2",
    date: "2025.12.5",
    title: "운동 열심히 한 날",
    emotion: "무난함",
    topic: "운동/요리",
    content:
      "오랜만에 헬스장에 가서 운동을 했어요. 계속 미루다가 가서 처음에는 힘들었지만 계속 운동을 하다보니 기분이 좋아졌어요. 운동을 마치고 집에 돌아가서 간단한 파스타를 만들었는데 생각보다 맛있게 나와서 기분이 좋았어요. 오늘 하루는 운동도 하고 요리도 해서 뿌듯한 하루였어요.",
    likes: 5,
  },
  {
    writer: "Test1",
    date: "2025.12.1",
    title: "조용한 하루",
    emotion: "평온",
    topic: "일상",
    content: "오늘은 별다른 일 없이 조용하게 보낸 하루였다.",
    likes: 0,
  },
];

const Community = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col items-center">
      <DefaultHeader showIcon="community" />

      <Container withBottomNav={true}>
        {dummyPosts.map((post, idx) => (
          <CommunityCard
            key={idx}
            writer={post.writer}
            date={post.date}
            title={post.title}
            emotion={post.emotion}
            topic={post.topic}
            content={post.content}
            likes={post.likes}
            onClick={() => navigate(`/community/detail/${idx}`)}
          />
        ))}
      </Container>

      <BottomNav />
    </div>
  );
};

export default Community;
