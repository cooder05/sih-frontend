import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

function HomePage() {
  const { t } = useTranslation();
  const [hazardMarkers, setHazardMarkers] = useState<any[]>([]);

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    // Get hazard markers from localStorage
    const storedMarkers = localStorage.getItem("hazardMarkers");
    if (storedMarkers) {
      const parsedMarkers = JSON.parse(storedMarkers);

      // Admin sees all, user sees only the first
      setHazardMarkers(isAdmin ? parsedMarkers : parsedMarkers.slice(0, 1));
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: 700,
          color: "#FFC300",
          marginBottom: "0.5em",
          textAlign: "center",
        }}
      >
        {t("homepage_title")}
      </h1>
      <h2
        style={{
          fontSize: "1.4rem",
          color: "#fff",
          fontWeight: 400,
          marginBottom: "1em",
          textAlign: "center",
        }}
      >
        {t("homepage_subtitle")}
      </h2>
      <p
        style={{
          color: "#aaa",
          fontSize: "1.1rem",
          maxWidth: 600,
          margin: "0 auto 2em",
          textAlign: "center",
        }}
      >
        {t("homepage_about")}
      </p>

      {/* Notification Section */}
      <div style={{ width: "100%", maxWidth: 600, marginTop: "2rem" }}>
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#fff",
            marginBottom: "1rem",
          }}
        >
          Notifications
        </h3>
        {hazardMarkers.length === 0 && (
          <p style={{ color: "#ccc" }}>No notifications available.</p>
        )}
        {hazardMarkers.map((marker) => (
          <div
            key={marker.id}
            style={{
              background: "#222",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              borderLeft: `5px solid ${marker.color}`,
            }}
          >
            <strong style={{ color: "#fff" }}>
              {marker.type.replace("_", " ")}
            </strong>
            <p style={{ color: "#ccc", margin: "0.5rem 0" }}>
              {marker.description}
            </p>
            <small style={{ color: "#888" }}>
              Lat: {marker.lat.toFixed(4)}, Lng: {marker.lng.toFixed(4)}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
