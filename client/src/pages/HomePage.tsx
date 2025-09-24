import { useTranslation } from "react-i18next";
import LoginButton from '../components/ui/LoginButton';

function HomePage() {
  const { t } = useTranslation();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      
      <div style={{ position: "absolute", top: "5rem", right: "2rem" }}>
        <LoginButton />
      </div>
      
      <h1 style={{ fontSize: "3rem", fontWeight: 700, color: "#FFC300", marginBottom: "0.5em", textAlign: "center" }}>
        {t("homepage_title")}
      </h1>
      <h2 style={{ fontSize: "1.4rem", color: "#fff", fontWeight: 400, marginBottom: "1em", textAlign: "center" }}>
        {t("homepage_subtitle")}
      </h2>
      <p style={{ color: "#aaa", fontSize: "1.1rem", maxWidth: 600, margin: "0 auto 2em", textAlign: "center" }}>
        {t("homepage_about")}
      </p>
      <div style={{ display: "flex", gap: "1.5em", marginTop: "1.5em" }}>
        <button
          style={{
            padding: "0.75em 2em",
            borderRadius: "8px",
            background: "#7ee7e7",
            color: "#0a1b28",
            fontWeight: 700,
            fontSize: "1.05rem",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
          }}
        >
          {t("homepage_report")}
        </button>
        <button
          style={{
            padding: "0.75em 2em",
            borderRadius: "8px",
            background: "#185adb",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1.05rem",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}
        >
          {t("homepage_map")}
        </button>
      </div>
    </div>
  );
}

export default HomePage;