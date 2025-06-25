import React from "react";
import "../index.css";

const HERO_TEXT = "Spill Tea. Stack Clout. Stay Shady.";

const HERO_IMAGE = "/assets/banner.png"; // Replace this with your generated hero image

const Hero: React.FC = () => {
  // Check if the image exists (basic fallback for dev/demo)
  // In production, you may want a more robust check or always use the image
  const [imgLoaded, setImgLoaded] = React.useState(true);

  React.useEffect(() => {
    const img = new window.Image();
    img.src = HERO_IMAGE;
    img.onload = () => setImgLoaded(true);
    img.onerror = () => setImgLoaded(false);
  }, []);

  return (
    <div
      className="hero-banner"
      style={
        imgLoaded
          ? {
              backgroundImage: `url(${HERO_IMAGE})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "400px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }
          : {
              background: "linear-gradient(90deg, #ffb6ff 0%, #b5ffd9 100%)",
              width: "100%",
              height: "400px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }
      }
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.35)",
          zIndex: 1,
        }}
      />
      <h1
        style={{
          position: "relative",
          zIndex: 2,
          fontFamily: "'Anton', 'Oswald', Arial, sans-serif",
          fontSize: "3rem",
          color: "#fff",
          textShadow: "0 2px 16px #ff00cc, 0 4px 32px #00ffe7, 2px 2px 0 #000, 0 0 8px #fff",
          letterSpacing: "0.05em",
          padding: "0 2rem",
          textAlign: "center",
          background: "linear-gradient(90deg, #ff0055 0%, #00ffe7 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 0 8px #fff) drop-shadow(0 0 16px #ff00cc)",
        }}
      >
        {HERO_TEXT}
      </h1>
    </div>
  );
};

export default Hero; 