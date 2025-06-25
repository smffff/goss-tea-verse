import React from "react";
import "../index.css";

const HERO_TEXT = "Spill Tea. Stack Clout. Stay Shady.";
const HERO_SUBHEAD = "Anonymous, viral, and a little bit dangerous.";
const HERO_IMAGE = "/assets/banner.png";

const Hero: React.FC = () => {
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
      {/* Floating Beta Badge */}
      <div
        className="absolute top-4 right-4 bg-yellow-400 px-3 py-1 text-xs font-bold rounded-full animate-bounce-subtle shadow-lg z-20"
        style={{ pointerEvents: "none" }}
      >
        Beta Brew 🍵
      </div>
      {/* Overlay */}
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
      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center w-full"
        style={{ textAlign: "center" }}
      >
        <h1
          className="animate-fadeInUp"
          style={{
            fontFamily: "'Anton', 'Oswald', Arial, sans-serif",
            fontSize: "3rem",
            color: "#fff",
            textShadow:
              "0 2px 16px #ff00cc, 0 4px 32px #00ffe7, 2px 2px 0 #000, 0 0 8px #fff",
            letterSpacing: "0.05em",
            padding: "0 2rem",
            background: "linear-gradient(90deg, #ff0055 0%, #00ffe7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter:
              "drop-shadow(0 0 8px #fff) drop-shadow(0 0 16px #ff00cc)",
          }}
        >
          {HERO_TEXT}
        </h1>
        <p
          className="mt-2 animate-fadeInUp animation-delay-200"
          style={{
            fontFamily: "'Oswald', Arial, sans-serif",
            fontSize: "1.25rem",
            color: "#fff",
            textShadow: "0 1px 8px #ffb6ff, 0 2px 16px #00ffe7",
            padding: "0 1.5rem",
            maxWidth: 600,
            margin: "0 auto",
            opacity: 0.95,
          }}
        >
          {HERO_SUBHEAD}
        </p>
        <a href="/spill-manual" className="mt-4">
          <button
            className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition hover-lift animate-fadeInUp animation-delay-300 shadow-lg"
            style={{ fontFamily: "'Oswald', Arial, sans-serif", fontSize: "1.1rem" }}
          >
            Submit Anonymous Tea
          </button>
        </a>
      </div>
    </div>
  );
};

export default Hero; 