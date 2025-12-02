import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Login, Signup, Diary, Report, Mypage, Loading } from "@pages/index";

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
        <Routes>
          {/* Init */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route>
            {/* Diary */}
            <Route path="/diary" element={<Diary />} />

            {/* Report */}
            <Route path="/report" element={<Report />} />

            {/* MyPage */}
            <Route path="/mypage" element={<Mypage />} />

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
