import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import LandingPage from "./pages/LandingPage";
import UserSignup from "./pages/UserSignup";
import UserLogin from "./pages/UserLogin";
import WorkerSignup from "./pages/WorkerSignup";
import WorkerLogin from "./pages/WorkerLogin";
import UserHome from "./pages/UserHome";
import WorkerHome from "./pages/WorkerHome";

function App() {
  return (
    <Router>
      <Routes>

        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* User Routes */}
        <Route path="/signup-user" element={<UserSignup />} />
        <Route path="/login-user" element={<UserLogin />} />
        <Route path="/user-home" element={<UserHome />} />

        {/* Worker Routes */}
        <Route path="/signup-worker" element={<WorkerSignup />} />
        <Route path="/login-worker" element={<WorkerLogin />} />
        <Route path="/worker-home" element={<WorkerHome />} />


      </Routes>
    </Router>
  );
}

export default App;
