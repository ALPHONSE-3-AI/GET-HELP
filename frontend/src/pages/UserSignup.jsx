import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserSignup.css";

function UserSignup() {
  const navigate = useNavigate();

  const [registered, setRegistered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegistered(true);
  };

  return (
    <div className="signup-container">

      {!registered ? (
        <div className="signup-card">
          <h2>Create Your Account</h2>
          <p className="subtitle">Join GetHelp and connect instantly</p>

          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="text" placeholder="Phone Number" required />
            <input type="text" placeholder="Address" required />
            <input type="text" placeholder="Locality" required />

            <button type="submit" className="signup-btn">
              Register Now
            </button>
          </form>
        </div>
      ) : (
        <div className="success-card">
          <h2>🎉 Registration Successful!</h2>
          <p>Welcome to GetHelp. Your account has been created.</p>

          <button
            className="home-btn"
            onClick={() => navigate("/")}
          >
            Go To Home Page
          </button>
        </div>
      )}

    </div>
  );
}

export default UserSignup;
