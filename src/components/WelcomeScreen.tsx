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
      background: "linear-gradient(135deg, #ff7ce5 0%, #a78bfa 50%, #facc15 100%)",
      fontFamily: 'Comic Sans MS, Comic Sans, Chalkboard SE, Comic Neue, cursive',
      overflow: isMobile ? "auto" : "hidden"
    }}>
      {/* Header Section */}
      <div style={{
        flex: isMobile ? "0 0 auto" : "0 0 30%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "24px 20px 16px" : isTablet ? "30px 24px" : "40px 32px",
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: isMobile ? 28 : isTablet ? 36 : 48,
          fontWeight: "900",
          color: "#fff",
          textShadow: "2px 2px 8px #000, 0 0 24px #ff0",
          marginBottom: isMobile ? 8 : 12,
          animation: "bounce 2s infinite"
        }}>
          WHERE'S THE CEO?
        </h1>
        <div style={{ 
          fontSize: isMobile ? 14 : isTablet ? 16 : 20, 
          color: "#fff", 
          fontWeight: "900", 
          marginBottom: isMobile ? 12 : 12 
        }}>
          👁️ Spot the executive love affair! 💖
        </div>
      </div>

      {/* Main Content Section */}
      <div style={{
        flex: "1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isMobile ? 20 : 24,
        padding: isMobile ? "0 20px" : isTablet ? "24px" : "32px",
        minHeight: isMobile ? "auto" : "50vh"
      }}>
        {/* Character Labels */}
        <div style={{
          display: "flex",
          gap: isMobile ? 12 : 12,
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: isMobile ? 16 : 16
        }}>
          <div style={{
            background: "rgba(59, 130, 246, 0.9)",
            border: "2px solid #fff",
            borderRadius: isMobile ? 12 : 12,
            padding: isMobile ? "8px 16px" : "8px 12px",
            color: "#fff",
            fontWeight: "bold",
            fontSize: isMobile ? 12 : 12,
            display: "flex",
            alignItems: "center",
            gap: 6
          }}>
            <span style={{ fontSize: isMobile ? 14 : 14 }}>👔</span>
            <span>CEO</span>
          </div>
          <div style={{
            background: "rgba(236, 72, 153, 0.9)",
            border: "2px solid #fff",
            borderRadius: isMobile ? 12 : 12,
            padding: isMobile ? "8px 16px" : "8px 12px",
            color: "#fff",
            fontWeight: "bold",
            fontSize: isMobile ? 12 : 12,
            display: "flex",
            alignItems: "center",
            gap: 6
          }}>
            <span style={{ fontSize: isMobile ? 14 : 14 }}>💃</span>
            <span>MISTRESS</span>
          </div>
        </div>

        {/* Primary Instruction */}
        <div style={{
          background: "rgba(236, 72, 153, 0.9)",
          border: "3px solid #dc2626",
          borderRadius: isMobile ? 16 : 16,
          padding: isMobile ? "16px 20px" : "16px 20px",
          maxWidth: isMobile ? "100%" : "400px",
          marginBottom: isMobile ? 20 : 20
        }}>
          <div style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: isMobile ? 16 : 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            textAlign: "center"
          }}>
            🎯 FIND THESE TWO IN THE CROWD! 🎯
          </div>
        </div>

        {/* CEO/Mistress Image - Centered */}
        <div style={{
          textAlign: "center",
          marginBottom: isMobile ? 20 : 20
        }}>
          <img
            src="/assets/ceo-mistress-frame2.png"
            alt="CEO and Mistress"
            style={{
              width: isMobile ? 140 : isTablet ? 160 : 200,
              height: "auto",
              borderRadius: isMobile ? 16 : 16,
              border: "3px solid #fff",
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
              animation: "float 3s ease-in-out infinite"
            }}
          />
        </div>
      </div>

      {/* Footer Section - Start Button */}
      <div style={{
        flex: isMobile ? "0 0 auto" : "0 0 25%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "20px" : isTablet ? "24px" : "32px"
      }}>
        <button
          onClick={onStart}
          style={{
            background: "linear-gradient(135deg, #facc15 0%, #f59e0b 100%)",
            border: "3px solid #fff",
            borderRadius: isMobile ? 16 : 16,
            padding: isMobile ? "16px 32px" : isTablet ? "16px 32px" : "20px 40px",
            color: "#18181b",
            fontWeight: "bold",
            fontSize: isMobile ? 18 : isTablet ? 20 : 24,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
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
          <span style={{ fontSize: isMobile ? 20 : 22 }}>🚀</span>
          START HUNTING!
          <span style={{ fontSize: isMobile ? 20 : 22 }}>🚀</span>
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;