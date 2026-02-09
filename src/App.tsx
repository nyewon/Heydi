import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {
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
  LikePosts,
  SharedPost,
  Loading,
  Splash,
} from "@pages/index";
import { ScrollToTop, InitRoute, ProtectedRoute } from "@components/index";
import { useAuthStore } from "@stores/useAuthStore";

const App = () => {
  const checkAuth = useAuthStore(state => state.checkAuth);
  const isLoading = useAuthStore(state => state.isLoading);
  const [showSplash, setShowSplash] = useState(
    !sessionStorage.getItem("splashShown"),
  );

  useEffect(() => {
    checkAuth();

    if (!showSplash) return;

    const timer = setTimeout(() => {
      sessionStorage.setItem("splashShown", "true");
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [showSplash]);

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
        {showSplash ? (
          <Splash />
        ) : isLoading ? (
          <Loading />
        ) : (
          <>
            <ScrollToTop />
            <Routes>
              {/* Init */}
              <Route path="/" element={<InitRoute />} />
              <Route path="/signup" element={<Signup />} />

              <Route element={<ProtectedRoute />}>
                {/* Diary */}
                <Route path="/diary" element={<Diary />} />
                <Route path="/diary/wait" element={<DiaryWaiting />} />
                <Route path="/diary/chat/:sessionId" element={<DiaryChat />} />
                <Route
                  path="/diary/detail/:diaryId"
                  element={<DiaryDetail />}
                />
                <Route path="/diary/edit/:diaryId" element={<DiaryEdit />} />

                {/* Report */}
                <Route path="/report" element={<Report />} />

                {/* Community */}
                <Route path="/community" element={<Community />} />
                <Route
                  path="/community/detail/:postId"
                  element={<PostDetail />}
                />
                <Route
                  path="/community/select-diary"
                  element={<SelectDiary />}
                />
                <Route
                  path="/community/post-edit/:diaryId"
                  element={<PostEdit />}
                />

                {/* MyPage */}
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/mypage/edit" element={<ProfileEdit />} />
                <Route path="/mypage/like-posts" element={<LikePosts />} />
                <Route path="/mypage/shared-posts" element={<SharedPost />} />

                {/* Etc */}
                <Route path="/etc" element={<Loading />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
