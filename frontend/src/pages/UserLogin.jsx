import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserLogin.css";

function UserLogin() {
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

    // For now, simple login success
    navigate("/user-home");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue</p>

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

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="back-link" onClick={() => navigate("/")}>
          ← Back to Home
        </p>
      </div>
    </div>
  );
}

export default UserLogin;
