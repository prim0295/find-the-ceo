import React, { useState, useEffect } from "react";
import { getDeviceType, getScreenDimensions } from '../utils/deviceDetection';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);
  const [screenDimensions, setScreenDimensions] = useState(getScreenDimensions());

  // Update screen dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setScreenDimensions(getScreenDimensions());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload critical images
  useEffect(() => {
    const preloadImages = [
      '/assets/ceo-mistress-frame1.png',
      '/assets/ceo-mistress-frame2.png',
      '/assets/ceo-mistress-frame3.png',
      '/assets/ceo-mistress-frame4.png',
      '/crowd-images/crowd3.png',
      '/assets/meme1.png',
      '/assets/meme2.png',
      '/assets/meme3.png',
      '/assets/meme4.png',
      '/assets/kiss-cam.png'
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
      img.onerror = () => {
        // Skip failed images and continue
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
        padding: screenDimensions.deviceType === 'mobile' ? 16 : 32,
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: screenDimensions.deviceType === 'mobile' ? 32 : 48,
          fontWeight: "900",
          color: "#fff",
          textShadow: "2px 2px 8px #000",
          marginBottom: 32
        }}>
          🎯 LOADING... 🎯
        </h1>
        <div style={{
          width: screenDimensions.deviceType === 'mobile' ? 250 : 300,
          height: 20,
          background: "rgba(255,255,255,0.3)",
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 16
        }}>
          <div style={{
            width: `${(loadedImages / 10) * 100}%`,
            height: "100%",
            background: "linear-gradient(90deg, #22c55e, #facc15)",
            transition: "width 0.3s ease"
          }} />
        </div>
        <div style={{ color: "#fff", fontSize: screenDimensions.deviceType === 'mobile' ? 14 : 18 }}>
          Loading assets... {loadedImages}/10
        </div>
      </div>
    );
  }

  const isMobile = screenDimensions.deviceType === 'mobile';
  const isTablet = screenDimensions.deviceType === 'tablet';

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #ff7ce5 0%, #a78bfa 50%, #facc15 100%)",
      fontFamily: 'Comic Sans MS, Comic Sans, cursive',
      padding: isMobile ? 16 : isTablet ? 24 : 32,
      textAlign: "center",
      overflow: "hidden"
    }}>
      <h1 style={{
        fontSize: isMobile ? 36 : isTablet ? 42 : 56,
        fontWeight: "900",
        color: "#fff",
        textShadow: "2px 2px 8px #000, 0 0 24px #ff0",
        marginBottom: isMobile ? 12 : 16,
        animation: "bounce 2s infinite"
      }}>
        WHERE'S THE CEO?
      </h1>
      <div style={{ 
        fontSize: isMobile ? 16 : isTablet ? 18 : 24, 
        color: "#fff", 
        fontWeight: "900", 
        marginBottom: isMobile ? 8 : 12 
      }}>
        👁️ Spot the executive love affair! 💖
      </div>
      <div style={{
        display: "flex",
        gap: isMobile ? 8 : 12,
        marginBottom: isMobile ? 16 : 24,
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        <div style={{
          background: "rgba(59, 130, 246, 0.9)",
          border: "2px solid #fff",
          borderRadius: isMobile ? 12 : 16,
          padding: isMobile ? "8px 12px" : "12px 16px",
          color: "#fff",
          fontWeight: "bold",
          fontSize: isMobile ? 12 : 14,
          display: "flex",
          alignItems: "center",
          gap: 6
        }}>
          <span style={{ fontSize: isMobile ? 14 : 16 }}>👔</span>
          <span>CEO</span>
        </div>
        <div style={{
          background: "rgba(236, 72, 153, 0.9)",
          border: "2px solid #fff",
          borderRadius: isMobile ? 12 : 16,
          padding: isMobile ? "8px 12px" : "12px 16px",
          color: "#fff",
          fontWeight: "bold",
          fontSize: isMobile ? 12 : 14,
          display: "flex",
          alignItems: "center",
          gap: 6
        }}>
          <span style={{ fontSize: isMobile ? 14 : 16 }}>💃</span>
          <span>MISTRESS</span>
        </div>
      </div>
      <div style={{
        background: "rgba(236, 72, 153, 0.9)",
        border: "3px solid #dc2626",
        borderRadius: isMobile ? 16 : 20,
        padding: isMobile ? 16 : 20,
        marginBottom: isMobile ? 16 : 24,
        maxWidth: isMobile ? "90%" : "600px"
      }}>
        <div style={{
          color: "#fff",
          fontWeight: "bold",
          fontSize: isMobile ? 16 : 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8
        }}>
          🎯 FIND THESE TWO IN THE CROWD! 🎯
        </div>
      </div>
      <div style={{
        background: "rgba(253, 224, 71, 0.9)",
        border: "3px solid #f59e0b",
        borderRadius: isMobile ? 16 : 20,
        padding: isMobile ? 16 : 20,
        marginBottom: isMobile ? 24 : 32,
        maxWidth: isMobile ? "90%" : "600px"
      }}>
        <div style={{
          color: "#18181b",
          fontWeight: "bold",
          fontSize: isMobile ? 14 : 16,
          marginBottom: isMobile ? 12 : 16
        }}>
          Find the CEO and his Mistress as many times as possible to score maximum points!
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 8 : 16,
          color: "#18181b",
          fontWeight: "bold",
          fontSize: isMobile ? 12 : 14
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: isMobile ? 16 : 18 }}>👔</span>
            <span>Spot the CEO</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: isMobile ? 16 : 18 }}>💃</span>
            <span>Find the Mistress</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: isMobile ? 16 : 18 }}>🔦</span>
            <span>{isMobile ? "Tap to move spotlight" : "Move your spotlight"}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: isMobile ? 16 : 18 }}>⏰</span>
            <span>30 seconds only!</span>
          </div>
        </div>
      </div>
      
      {/* CEO/Mistress Image */}
      <div style={{
        marginBottom: isMobile ? 24 : 32,
        textAlign: "center"
      }}>
        <img
          src="/assets/ceo-mistress-frame2.png"
          alt="CEO and Mistress"
          style={{
            width: isMobile ? 200 : isTablet ? 250 : 300,
            height: "auto",
            borderRadius: isMobile ? 16 : 20,
            border: "3px solid #fff",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            animation: "float 3s ease-in-out infinite"
          }}
        />
      </div>
      
      <button
        onClick={onStart}
        style={{
          background: "linear-gradient(135deg, #facc15 0%, #f59e0b 100%)",
          border: "3px solid #fff",
          borderRadius: isMobile ? 16 : 20,
          padding: isMobile ? "16px 32px" : "20px 40px",
          color: "#18181b",
          fontWeight: "bold",
          fontSize: isMobile ? 18 : 24,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          animation: "bounce 2s infinite",
          transition: "transform 0.2s ease"
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.transform = "scale(1)";
        }}
      >
        <span style={{ fontSize: isMobile ? 20 : 24 }}>🚀</span>
        START HUNTING!
        <span style={{ fontSize: isMobile ? 20 : 24 }}>🚀</span>
      </button>
    </div>
  );
};

export default WelcomeScreen;