import React, { useEffect, useRef, useState } from "react";

const FLASH_DURATION = 5; // seconds
const ZOOM = 1.2;
const SPOTLIGHT_RADIUS = 120;

const FlashScreen = ({ onDone }: { onDone: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(FLASH_DURATION);

  useEffect(() => {
    if (timeLeft === 0) {
      onDone();
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
      // TODO: Play sound effect here
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onDone]);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#111"
      }}
    >
      <img
        src="/crowd-images/crowd2.png"
        alt="Crowd"
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          filter: "blur(10px) brightness(0.6)",
          zIndex: 1
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          color: "#fff",
          fontFamily: 'Comic Sans MS, Comic Sans, cursive',
          textAlign: "center",
          padding: 40,
          background: "rgba(0,0,0,0.5)",
          borderRadius: 24,
          boxShadow: "0 0 40px #00ffff, 0 0 80px #ff00ff"
        }}
      >
        <h2 style={{ fontSize: 36, marginBottom: 20 }}>
          Find the CEO and the Mistress as many times as possible to score maximum points!
        </h2>
        <div style={{ fontSize: 24, marginBottom: 16 }}>
          You have 30 seconds per session. Tap the couple when you spot them!
        </div>
        <div style={{ fontSize: 48, color: "#ffff00", textShadow: "2px 2px 0 #ff00ff" }}>
          {timeLeft}
        </div>
        <div style={{ fontSize: 18, marginTop: 10 }}>
          Get ready...
        </div>
      </div>
    </div>
  );
};

const SpotlightCanvas: React.FC = () => {
  const [spot, setSpot] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      let x = window.innerWidth / 2;
      let y = window.innerHeight / 2;
      if ("touches" in e && e.touches.length > 0) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else if ("clientX" in e) {
        x = e.clientX;
        y = e.clientY;
      }
      setSpot({ x, y });
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, []);

  const mask = `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${spot.x}px ${spot.y}px, transparent 0%, transparent 80%, rgba(0,0,0,0.85) 100%)`;

  return (
    <div style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      background: "#111"
    }}>
      <img
        src="/crowd-images/crowd2.png"
        alt="Crowd"
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          transform: `scale(${ZOOM})`,
          filter: "brightness(0.9)",
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 1
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 2,
          background: mask,
          transition: "background 0.1s"
        }}
      />
    </div>
  );
};

interface GameScreenProps {
  onGameEnd: (score: number, stats: { correct: number; time: number }) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onGameEnd }) => {
  const [showFlash, setShowFlash] = useState(true);

  return showFlash ? (
    <FlashScreen onDone={() => setShowFlash(false)} />
  ) : (
    <SpotlightCanvas />
  );
};

export default GameScreen;