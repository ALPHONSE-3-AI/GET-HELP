
import { useNavigate } from "react-router-dom";
import AnimatedShaderBackground from "../components/AnimatedShaderBackground";

import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Background Animation */}
      <AnimatedShaderBackground />

      {/* Main Landing Content */}
      <div className="landing">

        {/* Navbar */}
        <nav className="navbar">
          <div className="logo">GetHelp</div>

          <div className="nav-links">
            <button onClick={() => navigate("/login-user")}>
              Login User
            </button>

            <button onClick={() => navigate("/signup-user")}>
              Sign Up User
            </button>

            <button onClick={() => navigate("/login-worker")}>
              Login Worker
            </button>

            <button onClick={() => navigate("/signup-worker")}>
              Sign Up Worker
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="hero">
          <h1>Your Town’s Instant Help Network</h1>

          <p>
            Find trusted plumbers, electricians, tutors and more near you —
            fast, simple and reliable.
          </p>

          <button
            className="primary-btn"
            onClick={() => navigate("/login-user")}
          >
            Find Help Now
          </button>
        </div>

      </div>
    </>
  );
}

export default LandingPage;

