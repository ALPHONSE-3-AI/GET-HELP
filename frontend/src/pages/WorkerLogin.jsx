import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WorkerLogin.css";

function WorkerLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // Temporary login success
    navigate("/worker-home");
  };

  return (
    <div className="worker-login-container">
      <div className="worker-login-card">

        <h1 className="worker-login-heading">Worker Login</h1>
        <p className="worker-login-subtitle">
          Access your dashboard and manage availability
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
          />

          {error && <p className="worker-error">{error}</p>}

          <button type="submit" className="worker-login-btn">
            Login
          </button>
        </form>

        <p className="worker-back" onClick={() => navigate("/")}>
          ← Back to Home
        </p>

      </div>
    </div>
  );
}

export default WorkerLogin;
