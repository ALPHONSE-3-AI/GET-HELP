import { useState } from "react";
import "./UserHome.css";

function UserHome() {
  const [selectedService, setSelectedService] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const services = [
    "Electrician",
    "Plumber",
    "Carpenter",
    "Mechanic"
  ];

  const handleLocateMe = () => {
    setShowMap(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const iframe = document.getElementById("mapFrame");
        iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon-0.01},${lat-0.01},${lon+0.01},${lat+0.01}&layer=mapnik&marker=${lat},${lon}`;
      });
    }
  };

  return (
    <div className="userhome-container">

      {/* Top Bar */}
      <div className="topbar">
        <h2>User Dashboard</h2>

        <div className="locate-btn" onClick={handleLocateMe}>
          LocateME
        </div>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <input type="text" placeholder="Search by Locality..." />
        <button>Search</button>
      </div>

      {/* Services Section */}
      <div className="services-container">
        {services.map((service) => (
          <div
            key={service}
            className={`service-box ${
              selectedService === service ? "active" : ""
            }`}
            onClick={() => setSelectedService(service)}
          >
            {service}
          </div>
        ))}
      </div>

      {/* Map Section */}
      {showMap && (
        <div className="map-container">
          <iframe
            id="mapFrame"
            title="OpenStreetMap"
            width="100%"
            height="300"
            style={{ border: 0 }}
          ></iframe>
        </div>
      )}

    </div>
  );
}

export default UserHome;
