import { useNavigate } from "react-router-dom";
import "./WorkerHome.css";

function WorkerHome() {
  const navigate = useNavigate();

  // Temporary worker details (later from backend)
  const worker = {
    id: "W001",
    name: "John Carpenter",
    email: "john@email.com",
    phone: "9876543210",
    profession: "Carpenter",
    locality: "Downtown"
  };

  return (
    <div className="workerhome-container">

      {/* Top Bar */}
      <div className="topbar">
        <h2 className="welcome-text">Welcome, {worker.name}</h2>

        <div className="diamond-btn">
          <span>FindME</span>
        </div>
      </div>

      {/* Worker Details Card */}
      <div className="details-card">
        <h3>Worker Details</h3>

        <p><strong>ID:</strong> {worker.id}</p>
        <p><strong>Email:</strong> {worker.email}</p>
        <p><strong>Phone:</strong> {worker.phone}</p>
        <p><strong>Profession:</strong> {worker.profession}</p>
        <p><strong>Locality:</strong> {worker.locality}</p>

        <button
          className="logout-btn"
          onClick={() => navigate("/worker-login")}
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default WorkerHome;
