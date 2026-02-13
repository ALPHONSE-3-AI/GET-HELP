import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WorkerSignup.css";

function WorkerSignup() {
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegistered(true);
  };

  return (
    <div className="worker-container">

      {!registered ? (
        <div className="worker-card">
          <h1 className="worker-heading">Worker Sign Up</h1>
          <p className="worker-subtitle">
            Join GetHelp and grow your local business
          </p>

          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Worker ID" required />
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="text" placeholder="Phone Number" required />
            <input type="text" placeholder="Address" required />
            <input type="text" placeholder="Profession" required />
            <input type="text" placeholder="Locality" required />

            <button type="submit" className="worker-btn">
              Register as Worker
            </button>
          </form>
        </div>
      ) : (
        <div className="worker-success">
          <h2>✅ Registration Successful!</h2>
          <p>Your worker account has been created.</p>

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

export default WorkerSignup;
