import React, { useState, useEffect } from "react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);

  // Preload critical images
  useEffect(() => {
    const preloadImages = [
      '/assets/ceo-mistress-frame1.png',
      '/assets/ceo-mistress-frame2.png',
      '/assets/ceo-mistress-frame3.png',
      '/assets/ceo-mistress-frame4.png',
      '/crowd-images/crowd3.png',
      '/crowd-images/crowd3_bg.png',
      '/crowd-images/crowd3_fg.png'
    ];

    let loaded = 0;
    preloadImages.forEach(src => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        setLoadedImages(loaded);
        if (loaded === preloadImages.length) {
          setLoading(false);
        }
      };
      img.src = src;
    });
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #ff7ce5 0%, #a78bfa 50%, #facc15 100%)",
        fontFamily: 'Comic Sans MS, Comic Sans, cursive',
        padding: 32,
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: 48,
          fontWeight: "900",
          color: "#fff",
          textShadow: "2px 2px 8px #000",
          marginBottom: 32
        }}>
          🎯 LOADING... 🎯
        </h1>
        <div style={{
          width: 300,
          height: 20,
          background: "rgba(255,255,255,0.3)",
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 16
        }}>
          <div style={{
            width: `${(loadedImages / 7) * 100}%`,
            height: "100%",
            background: "linear-gradient(90deg, #22c55e, #facc15)",
            transition: "width 0.3s ease"
          }} />
        </div>
        <div style={{ color: "#fff", fontSize: 18 }}>
          Loading assets... {loadedImages}/7
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
      textAlign: "center",
      background: "linear-gradient(135deg, #ff7ce5 0%, #a78bfa 50%, #facc15 100%)"
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Game Logo */}
        <div>
          <h1 style={{
            fontSize: 64,
            fontWeight: "900",
            color: "#fff",
            textShadow: "2px 2px 8px #000",
            transform: "rotate(-2deg)",
            margin: 0
          }}>
            WHERE'S THE
          </h1>
          <h1 style={{
            fontSize: 64,
            fontWeight: "900",
            color: "#FFD600",
            textShadow: "2px 2px 8px #000",
            transform: "rotate(1deg)",
            margin: 0
          }}>
            CEO?
    </h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#fff", margin: "16px 0" }}>
          <span role="img" aria-label="eye">👁️</span>
          <span style={{ fontSize: 24, fontWeight: "bold" }}>Spot the executive love affair!</span>
          <span role="img" aria-label="heart">💖</span>
        </div>

        {/* CEO Couple Image */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center", margin: "16px 0 24px 0" }}>
          <div style={{
            background: "linear-gradient(135deg, #ec4899, #a78bfa, #facc15)",
            padding: 8,
            borderRadius: 32,
            transform: "rotate(1deg)",
            animation: "float 3s ease-in-out infinite"
          }}>
            <div style={{ background: "#fff", padding: 16, borderRadius: 32 }}>
    <img
      src="/assets/ceo-mistress-frame2.png"
                alt="CEO and Mistress - Your Targets!"
                style={{ width: 320, borderRadius: 24, boxShadow: "0 0 40px #000", animation: "floatImg 4s ease-in-out infinite" }}
              />
            </div>
          </div>
          {/* Floating labels */}
          <div style={{
            position: "absolute", top: -16, left: -24, background: "#3b82f6", color: "#fff",
            fontWeight: "900", padding: "8px 24px", borderRadius: 999, border: "4px solid #fff",
            boxShadow: "0 4px 16px #000", transform: "rotate(-12deg)",
            animation: "bounce 2s infinite"
          }}>🤵 CEO</div>
          <div style={{
            position: "absolute", top: -16, right: -24, background: "#ec4899", color: "#fff",
            fontWeight: "900", padding: "8px 24px", borderRadius: 999, border: "4px solid #fff",
            boxShadow: "0 4px 16px #000", transform: "rotate(12deg)",
            animation: "bounce 2s infinite", animationDelay: "1s"
          }}>💃 MISTRESS</div>
        </div>

        {/* Call to action */}
        <div style={{
          background: "rgba(239, 68, 68, 0.2)",
          backdropFilter: "blur(4px)",
          borderRadius: 32,
          padding: 16,
          border: "4px solid #f87171",
          transform: "rotate(-1deg)",
          margin: "24px 0"
        }}>
          <p style={{
            color: "#fff",
            fontWeight: "900",
            fontSize: 32,
            animation: "pulse 2s infinite"
          }}>
            🎯 FIND THESE TWO IN THE CROWD! 🎯
          </p>
        </div>

        {/* Meme Description */}
        <div style={{
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(4px)",
          borderRadius: 32,
          padding: 24,
          border: "4px solid #FFD600",
          transform: "rotate(1deg)",
          margin: "24px 0"
        }}>
          <p style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 20,
            marginBottom: 16
          }}>
            Find the CEO and his Mistress as many times as possible to score maximum points!
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            color: "#FFD600",
            fontWeight: "bold",
            fontSize: 18
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span>🤵</span><span>Spot the CEO</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span>💃</span><span>Find the Mistress</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span>🔦</span><span>Move your spotlight</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span>⏰</span><span>30 seconds only!</span></div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ margin: "32px 0" }}>
    <button
      onClick={onStart}
      style={{
              background: "linear-gradient(90deg, #ec4899, #facc15)",
        color: "#181818",
              fontWeight: "900",
              fontSize: 28,
              padding: "20px 60px",
              borderRadius: 999,
              border: "4px solid #fff",
              boxShadow: "0 4px 24px #000",
              marginBottom: 16,
              cursor: "pointer"
      }}
    >
            🚀 START HUNTING! 🚀
    </button>
          <br />
      <button
            onClick={() => setSoundEnabled(!soundEnabled)}
        style={{
              background: "rgba(255,255,255,0.2)",
              color: "#fff",
              fontWeight: "bold",
          fontSize: 20,
              padding: "12px 36px",
              borderRadius: 999,
              border: "2px solid #fff",
              marginTop: 8,
              cursor: "pointer"
        }}
      >
            {soundEnabled ? "🔊 Sound ON" : "🔇 Sound OFF"}
      </button>
    </div>

        {/* Easter Egg Text */}
        <div style={{ color: "rgba(255,255,255,0.7)", fontWeight: "bold", fontSize: 14 }}>
          Inspired by that viral Coldplay moment 🎵
        </div>
      </div>
  </div>
);
};

export default WelcomeScreen;