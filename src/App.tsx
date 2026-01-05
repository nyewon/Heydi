import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {
  Login,
  Signup,
  Diary,
  DiaryWaiting,
  DiaryChat,
  DiaryDetail,
  DiaryEdit,
  Report,
  Community,
  PostDetail,
  SelectDiary,
  PostEdit,
  Mypage,
  ProfileEdit,
  Loading,
} from "@pages/index";
import { ScrollToTop } from "@components/common";

const App = () => {
  return (
    <Router>
      <div
        className="
          w-[100vw]
          max-w-[425px]
          min-w-[320px]
          flex
          justify-center
          items-center
          select-none
          [@supports(-webkit-touch-callout:none)]:tap-highlight-transparent
        "
      >
        <ScrollToTop />
        <Routes>
          {/* Init */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route>
            {/* Diary */}
            <Route path="/diary" element={<Diary />} />
            <Route path="/diary/wait" element={<DiaryWaiting />} />
            <Route path="/diary/chat/:sessionId" element={<DiaryChat />} />
            <Route path="/diary/detail/:diaryId" element={<DiaryDetail />} />
            <Route path="/diary/edit/:diaryId" element={<DiaryEdit />} />

            {/* Report */}
            <Route path="/report" element={<Report />} />

            {/* Community */}
            <Route path="/community" element={<Community />} />
            <Route path="/community/detail/:postId" element={<PostDetail />} />
            <Route path="/community/select-diary" element={<SelectDiary />} />
            <Route
              path="/community/post-edit/:diaryId"
              element={<PostEdit />}
            />

            {/* MyPage */}
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/mypage/edit" element={<ProfileEdit />} />

            {/* Etc */}
            <Route path="/etc" element={<Loading />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
