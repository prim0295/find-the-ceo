import React, { useEffect, useState, useRef } from "react";
import { bgMusic, correctSound, wrongSound, preloadAudio } from '../utils/audio';
import { beepSound } from '../utils/audio'; // Adjust path if needed
import { isMobile, getScreenDimensions } from '../utils/deviceDetection';

const FLASH_DURATION = 5; // seconds
const ZOOM = 1.2;
const SPOTLIGHT_RADIUS = 120;

// --- Figma-inspired FlashScreen with inline styles ---
const FlashScreen = ({ onDone }: { onDone: () => void }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let current = 5;
    setCountdown(current);
    
    // Play first beep after a short delay to avoid double playing
    const firstBeep = setTimeout(() => {
      beepSound.play();
    }, 100);
    
    const timer = setInterval(() => {
      current--;
      setCountdown(current);
      // Only play beep if countdown is still going
      if (current > 0) {
        beepSound.play();
      }
      if (current <= 0) {
        clearInterval(timer);
        // Play final longer beep before transitioning
        setTimeout(() => {
          beepSound.play();
          setTimeout(onDone, 500);
        }, 200);
      }
    }, 1000);
    
    return () => {
      clearInterval(timer);
      clearTimeout(firstBeep);
      beepSound.stop();
    };
  }, [onDone]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #4f046e 0%, #1e3a8a 50%, #312e81 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      fontFamily: 'Comic Sans MS, Comic Sans, Ayuthaya, Arial Rounded MT Bold, Chalkboard SE, Chalkboard, Congenial, cursive'
    }}>
      {/* Animated background circles */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <div style={{
          position: "absolute", top: 40, left: "25%", width: 128, height: 128,
          background: "rgba(255,255,255,0.1)", borderRadius: "50%", filter: "blur(32px)", animation: "pulse 2s infinite"
        }} />
        <div style={{
          position: "absolute", top: 80, right: "25%", width: 96, height: 96,
          background: "rgba(244,114,182,0.1)", borderRadius: "50%", filter: "blur(24px)", animation: "pulse 2s infinite", animationDelay: "1s"
        }} />
        <div style={{
          position: "absolute", bottom: 80, left: "33%", width: 112, height: 112,
          background: "rgba(253,224,71,0.1)", borderRadius: "50%", filter: "blur(32px)", animation: "pulse 2s infinite", animationDelay: "2s"
        }} />
      </div>

      <div style={{
        textAlign: "center",
        zIndex: 1,
        maxWidth: 900,
        margin: "0 auto",
        padding: 16
      }}>
        {/* Main instruction */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{
            fontSize: 48,
            fontWeight: "900",
            color: "#fff",
            textShadow: "2px 2px 8px #000"
          }}>
            🎯 MISSION BRIEFING 🎯
          </h1>
          <div style={{
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            borderRadius: 32,
            padding: 32,
            border: "4px solid #FFD600",
            margin: "32px 0"
          }}>
            <p style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#fff",
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
        </div>

        {/* Countdown timer */}
        <div style={{ marginBottom: 32 }}>
          <p style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#fff"
          }}>
            Game starts in...
          </p>
          <div style={{
            position: "relative",
            width: 200,
            height: 200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <div style={{
              fontSize: 96,
              fontWeight: "900",
              color: "#FFD600",
              textShadow: "2px 2px 8px #000",
              animation: "bounce 1s infinite",
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {countdown}
            </div>
            {/* Pulsing circle */}
            <div style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 200,
              height: 200,
              border: "8px solid #FFD600",
              borderRadius: "50%",
              opacity: 0.75,
              animation: "ping 1.5s infinite"
            }} />
          </div>
        </div>

        {/* Sound indicator */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          color: "rgba(255,255,255,0.7)",
          fontWeight: "bold",
          marginBottom: 16
        }}>
          <div style={{
            width: 12, height: 12, background: "#4ade80", borderRadius: "50%", animation: "pulse 1s infinite"
          }} />
          <span>Sound ON - Listen for the beeps!</span>
          <div style={{
            width: 12, height: 12, background: "#4ade80", borderRadius: "50%", animation: "pulse 1s infinite", animationDelay: "0.5s"
          }} />
        </div>

        {/* Fun warning */}
        {countdown <= 2 && (
          <div style={{ animation: "bounce 1s infinite" }}>
            <p style={{
              fontSize: 32,
              fontWeight: "900",
              color: "#ec4899"
            }}>
              🚨 GET READY TO HUNT! 🚨
            </p>
          </div>
        )}
      </div>

      {/* Corner decorations */}
      <div style={{ position: "absolute", top: 16, left: 16, fontSize: 32, animation: "spin 4s linear infinite" }}>🎪</div>
      <div style={{ position: "absolute", top: 16, right: 16, fontSize: 32, animation: "spin 4s linear infinite", animationDirection: "reverse" }}>🎭</div>
      <div style={{ position: "absolute", bottom: 16, left: 16, fontSize: 32, animation: "bounce 2s infinite" }}>🎵</div>
      <div style={{ position: "absolute", bottom: 16, right: 16, fontSize: 32, animation: "bounce 2s infinite", animationDelay: "0.5s" }}>🎤</div>
    </div>
  );
};

// --- Main Game Canvas with timer, session, points, final seconds, red flash ---
const CEO_RADIUS = 40; // Adjust to match your image size
const CEO_FRAMES = [
  "/assets/ceo-mistress-frame1.png",
  "/assets/ceo-mistress-frame2.png",
  "/assets/ceo-mistress-frame3.png",
  "/assets/ceo-mistress-frame4.png"
];

const getRandomPosition = () => ({
  x: Math.random() * (window.innerWidth - CEO_RADIUS * 2) + CEO_RADIUS,
  y: Math.random() * (window.innerHeight - CEO_RADIUS * 2) + CEO_RADIUS,
});

const SpotlightCanvas: React.FC<{
  timeLeft: number;
  totalTime: number;
  session: number;
  points: number;
  onWrongClick: () => void;
  showFinalWarning: boolean;
  onCorrectClick: () => void;
  ceoPos: { x: number; y: number };
  setCeoPos: (pos: { x: number; y: number }) => void;
  soundOn: boolean;
  setSoundOn: (on: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  onEndSession: () => void;
}> = ({ timeLeft, totalTime, session, points, onWrongClick, showFinalWarning, onCorrectClick, ceoPos, setCeoPos, soundOn, setSoundOn, menuOpen, setMenuOpen, onEndSession }) => {
  const [spot, setSpot] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [greenFlash, setGreenFlash] = useState(false);
  const [redFlash, setRedFlash] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState<{ x: number; y: number } | null>(null);
  const [animating, setAnimating] = useState(false);
  const [ceoFrame, setCeoFrame] = useState(1); // 1-based index for frame
  const [kissCam, setKissCam] = useState(false);
  const [ceoPopup, setCeoPopup] = useState(false);
  const [flyIns, setFlyIns] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [memePopup, setMemePopup] = useState<{ img: string; text: string; x: number; y: number; id: number } | null>(null);
  const flyInId = useRef(0);
  const memeId = useRef(0);
  const [screenDimensions, setScreenDimensions] = useState(getScreenDimensions());
  const [lastTap, setLastTap] = useState(0);
  const [tapCount, setTapCount] = useState(0);

  const MEMES = [
    { img: "/assets/meme1.png", text: "gotcha you fool!" },
    { img: "/assets/meme2.png", text: "Oh no, need espresso?" },
    { img: "/assets/meme3.png", text: "no Senorita, not here" },
    { img: "/assets/meme4.png", text: "You're a bad guyy ;)" }
  ];

  // Update screen dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setScreenDimensions(getScreenDimensions());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle both mouse and touch movement
  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (animating || zoomed) return;
    
    let clientX: number, clientY: number;
    
    if (e instanceof MouseEvent) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      // Touch event
      const touch = e.touches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
    }
    
    setSpot({ x: clientX, y: clientY });
  };

  // Handle both mouse and touch events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleMove(e);
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // Prevent scrolling
      handleMove(e);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleMove]);

  // Red flash effect
  useEffect(() => {
    if (redFlash) {
      const t = setTimeout(() => setRedFlash(false), 200);
      return () => clearTimeout(t);
    }
  }, [redFlash]);

  // Green flash effect
  useEffect(() => {
    if (greenFlash) {
      const t = setTimeout(() => setGreenFlash(false), 200);
      return () => clearTimeout(t);
    }
  }, [greenFlash]);

  // CEO animation effect (sync with zoom)
  useEffect(() => {
    if (animating && zoomed) {
      setCeoFrame(1);
      let timeouts: number[] = [];
      // 500ms gap after kisscam
      timeouts.push(setTimeout(() => setCeoFrame(2), 400 + 500)); // frame 2 at 900ms
      timeouts.push(setTimeout(() => setCeoFrame(3), 800 + 500)); // frame 3 at 1300ms
      timeouts.push(setTimeout(() => setCeoFrame(4), 1200 + 500)); // frame 4 at 1700ms
      timeouts.push(setTimeout(() => {
        setAnimating(false);
        setCeoFrame(1);
        setZoomed(false);
        // Move CEO to new position after animation completes
        setTimeout(() => {
          setCeoPos(getRandomPosition());
        }, 100);
      }, 1600 + 500)); // End at 2100ms
      return () => timeouts.forEach(clearTimeout);
    }
  }, [animating, zoomed]); // Removed setCeoPos dependency

  // Show kiss-cam overlay on correct click
  useEffect(() => {
    if (animating) {
      setKissCam(true);
      const t = setTimeout(() => setKissCam(false), 600);
      return () => clearTimeout(t);
    }
  }, [animating]);

  // Trigger popup animation when ceoPos changes
  useEffect(() => {
    setCeoPopup(true);
    const t = setTimeout(() => setCeoPopup(false), 400);
    return () => clearTimeout(t);
  }, [ceoPos.x, ceoPos.y]);

  // Click handler for both mouse and touch
  const handleClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (animating || zoomed) return; // Block input during animation
    
    let clientX: number, clientY: number;
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    
    if ('touches' in e) {
      // Touch event - implement double tap logic
      const touch = e.touches[0];
      clientX = touch.clientX - rect.left;
      clientY = touch.clientY - rect.top;
      
      const now = Date.now();
      const DOUBLE_TAP_DELAY = 300; // 300ms for double tap
      
      if (now - lastTap < DOUBLE_TAP_DELAY) {
        // Double tap detected
        setTapCount(prev => prev + 1);
        if (tapCount >= 1) {
          // Execute the action on double tap
          executeGameAction(clientX, clientY);
          setTapCount(0);
        }
      } else {
        // Single tap - just move spotlight
        setSpot({ x: clientX, y: clientY });
        setTapCount(1);
      }
      setLastTap(now);
    } else {
      // Mouse event - direct click
      clientX = e.clientX - rect.left;
      clientY = e.clientY - rect.top;
      executeGameAction(clientX, clientY);
    }
  };

  // Touch start handler for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (animating || zoomed) return; // Block input during animation
    
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const touch = e.touches[0];
    const clientX = touch.clientX - rect.left;
    const clientY = touch.clientY - rect.top;
    
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300; // 300ms for double tap
    
    if (now - lastTap < DOUBLE_TAP_DELAY) {
      // Double tap detected - execute game action
      executeGameAction(clientX, clientY);
      setTapCount(0);
    } else {
      // Single tap - just move spotlight
      setSpot({ x: clientX, y: clientY });
      setTapCount(1);
    }
    setLastTap(now);
  };

  // Execute the actual game action (hit detection)
  const executeGameAction = (clientX: number, clientY: number) => {
    // Move spotlight to click position
    setSpot({ x: clientX, y: clientY });
    
    // Calculate hit detection with simpler logic
    const hitRadius = 60; // Larger hit area for better mobile experience
    const distance = Math.sqrt(
      Math.pow(clientX - ceoPos.x, 2) + Math.pow(clientY - ceoPos.y, 2)
    );
    
    if (distance <= hitRadius) {
      // Correct click - CEO/mistress found
      setGreenFlash(true);
      setZoomOrigin({ x: ceoPos.x, y: ceoPos.y });
      setZoomed(true);
      setCeoFrame(1); // Ensure animation always starts at frame 1
      setAnimating(true);
      
      // Add fly-in animation
      const id = flyInId.current++;
      setFlyIns(flyIns => [...flyIns, { id, x: ceoPos.x, y: ceoPos.y }]);
      setTimeout(() => {
        setFlyIns(flyIns => flyIns.filter(f => f.id !== id));
      }, 1000);
      
      onCorrectClick();
    } else {
      // Wrong click
      setRedFlash(true);
      onWrongClick();
      
      // Meme popup logic
      const memeIdx = Math.floor(Math.random() * MEMES.length);
      const meme = MEMES[memeIdx];
      const id = memeId.current++;
      setMemePopup({ ...meme, x: clientX, y: clientY, id });
      setTimeout(() => {
        setMemePopup(current => (current && current.id === id ? null : current));
      }, 1000);
    }
  };

  // Calculate simple zoom transform with clamping
  let zoomStyle = {};
  if (zoomed && zoomOrigin) {
    const zoomScale = 2.5;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    // Calculate unclamped translation
    let offsetX = (zoomOrigin.x * (zoomScale - 1)) - (centerX * (zoomScale - 1));
    let offsetY = (zoomOrigin.y * (zoomScale - 1)) - (centerY * (zoomScale - 1));
    // Clamp so background always fills viewport
    const bgWidth = window.innerWidth;
    const bgHeight = window.innerHeight;
    const maxOffsetX = (bgWidth * (zoomScale - 1)) / (2 * zoomScale);
    const maxOffsetY = (bgHeight * (zoomScale - 1)) / (2 * zoomScale);
    offsetX = Math.max(-maxOffsetX, Math.min(offsetX, maxOffsetX));
    offsetY = Math.max(-maxOffsetY, Math.min(offsetY, maxOffsetY));
    zoomStyle = {
      transform: `scale(${zoomScale}) translate(${-offsetX / zoomScale}px, ${-offsetY / zoomScale}px)`,
      transition: 'transform 1s cubic-bezier(.23,1.02,.64,.99)',
      transformOrigin: `${zoomOrigin.x}px ${zoomOrigin.y}px`,
      zIndex: 999
    };
  } else {
    zoomStyle = {
      transform: 'none',
      transition: 'transform 1s cubic-bezier(.23,1.02,.64,.99)'
    };
  }

  const mask = `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${spot.x}px ${spot.y}px, transparent 0%, transparent 80%, rgba(0,0,0,0.85) 100%)`;
  const progress = (timeLeft / totalTime) * 100;

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      position: "relative",
      overflow: "hidden",
      background: "linear-gradient(135deg, #ff7ce5 0%, #a78bfa 50%, #facc15 100%)",
      fontFamily: 'Comic Sans MS, Comic Sans, Ayuthaya, Arial Rounded MT Bold, Chalkboard SE, Chalkboard, Congenial, cursive'
    }}>
      {/* Top UI Bar */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        background: "linear-gradient(135deg, rgba(255,124,229,0.9) 0%, rgba(167,139,250,0.9) 50%, rgba(250,204,21,0.9) 100%)",
        borderBottom: "3px solid #fff",
        padding: isMobile ? "8px 12px" : "12px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000,
        backdropFilter: "blur(10px)"
      }}>
        {/* Timer */}
        <div style={{
          background: "rgba(0,0,0,0.8)",
          color: "#fff",
          padding: isMobile ? "6px 12px" : "8px 16px",
          borderRadius: isMobile ? 12 : 16,
          fontWeight: "bold",
          fontSize: isMobile ? 14 : 16,
          border: "2px solid #fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
        }}>
          ⏰ {timeLeft}s
        </div>

        {/* Session and Points */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? 8 : 12
        }}>
          <div style={{
            background: "rgba(59, 130, 246, 0.9)",
            color: "#fff",
            padding: isMobile ? "6px 10px" : "8px 12px",
            borderRadius: isMobile ? 10 : 12,
            fontWeight: "bold",
            fontSize: isMobile ? 12 : 14,
            border: "2px solid #fff"
          }}>
            Session {session}
          </div>
          <div style={{
            background: "rgba(34, 197, 94, 0.9)",
            color: "#fff",
            padding: isMobile ? "6px 10px" : "8px 12px",
            borderRadius: isMobile ? 10 : 12,
            fontWeight: "bold",
            fontSize: isMobile ? 12 : 14,
            border: "2px solid #fff"
          }}>
            {points} pts
          </div>
        </div>

        {/* Menu Button */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "rgba(0,0,0,0.8)",
              border: "2px solid #fff",
              borderRadius: isMobile ? 10 : 12,
              color: "#fff",
              padding: isMobile ? "6px 8px" : "8px 10px",
              cursor: "pointer",
              fontSize: isMobile ? 16 : 18,
              fontWeight: "bold"
            }}
          >
            ☰
          </button>
          
          {menuOpen && (
            <div style={{
              position: "absolute",
              top: "100%",
              right: 0,
              background: "rgba(0,0,0,0.95)",
              border: "2px solid #fff",
              borderRadius: isMobile ? 10 : 12,
              padding: isMobile ? "8px" : "12px",
              marginTop: 4,
              zIndex: 1001,
              minWidth: isMobile ? 120 : 150
            }}>
              <button
                onClick={() => {
                  setSoundOn(!soundOn);
                  setMenuOpen(false);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  padding: isMobile ? "6px 8px" : "8px 10px",
                  cursor: "pointer",
                  fontSize: isMobile ? 12 : 14,
                  display: "block",
                  width: "100%",
                  textAlign: "left"
                }}
              >
                {soundOn ? "🔊 Sound On" : "🔇 Sound Off"}
              </button>
              <button
                onClick={() => {
                  onEndSession();
                  setMenuOpen(false);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  padding: isMobile ? "6px 8px" : "8px 10px",
                  cursor: "pointer",
                  fontSize: isMobile ? 12 : 14,
                  display: "block",
                  width: "100%",
                  textAlign: "left"
                }}
              >
                🏁 End Session
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Game Area */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          cursor: "crosshair"
        }}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
      >
        {/* Main game zoom container */}
        <div style={{ width: '100vw', height: '100vh', ...zoomStyle, position: 'absolute', left: 0, top: 0 }}>
          {/* Main background (single image) */}
          <img
            src='/crowd-images/crowd3.png'
            style={{
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              position: 'absolute',
              left: 0,
              top: 0,
              zIndex: 1
            }}
          />
          {/* CEO/mistress as sprite overlay (adaptive scaling as before) */}
          {(() => {
            const minScale = 0.4;
            const maxScale = 1.0;
            const crowdTop = 0;
            const crowdBottom = window.innerHeight;
            const scale =
              minScale +
              ((ceoPos.y - crowdTop) / (crowdBottom - crowdTop)) * (maxScale - minScale);
            let spriteWidth = 48 * scale;
            let spriteHeight = 64 * scale;
            // If zoomed in, increase sprite size to fit kiss-cam
            if (zoomed) {
              spriteWidth *= 1.8; // or your chosen multiplier
              spriteHeight *= 1.8;
            }
            return (
              <img
                src={CEO_FRAMES[ceoFrame - 1]}
                alt="CEO and Mistress"
                style={{
                  position: "absolute",
                  left: ceoPos.x - (zoomed ? (spriteWidth - 48 * scale) / 2 : 0),
                  top: ceoPos.y - (zoomed ? (spriteHeight - 64 * scale) / 2 : 0),
                  width: spriteWidth,
                  height: spriteHeight,
                  imageRendering: "pixelated",
                  zIndex: 2,
                  pointerEvents: "none",
                  animation: ceoPopup ? "ceopopup 0.4s cubic-bezier(.23,1.02,.64,.99)" : undefined
                }}
              />
            );
          })()}
          {/* Spotlight zoomed-in area */}
          <div
            style={{
              position: 'absolute',
              left: spot.x - SPOTLIGHT_RADIUS,
              top: spot.y - SPOTLIGHT_RADIUS,
              width: SPOTLIGHT_RADIUS * 2,
              height: SPOTLIGHT_RADIUS * 2,
              borderRadius: '50%',
              overflow: 'hidden',
              zIndex: 3,
              pointerEvents: 'none',
              boxShadow: '0 0 32px 8px #fff8'
            }}
          >
            <img
              src='/crowd-images/crowd_zoomedin1.png'
              style={{
                width: '100vw',
                height: '100vh',
                objectFit: 'cover',
                position: 'absolute',
                left: -spot.x + SPOTLIGHT_RADIUS,
                top: -spot.y + SPOTLIGHT_RADIUS
              }}
            />
          </div>
          {/* Timer Bar */}
          <div style={{
            position: 'absolute',
            top: screenDimensions.deviceType === 'mobile' ? 60 : 80,
            left: 0,
            right: 0,
            height: screenDimensions.deviceType === 'mobile' ? 4 : 6,
            background: 'rgba(255,255,255,0.2)',
            zIndex: 999
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: showFinalWarning ? '#ef4444' : '#22c55e',
              transition: 'width 1s linear, background 0.3s ease'
            }} />
          </div>
          {/* Final seconds warning */}
          {showFinalWarning && (
            <div style={{
              position: "absolute",
              top: 60,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 20,
              background: "#ef4444",
              color: "#fff",
              fontWeight: 900,
              fontSize: 22,
              borderRadius: 16,
              padding: "8px 32px",
              boxShadow: "0 2px 16px #0007",
              letterSpacing: 1
            }}>
               FINAL SECONDS!
            </div>
          )}
          {/* Green flash overlay */}
          {greenFlash && (
            <div style={{
              position: "absolute",
              inset: 0,
              background: "rgba(34,197,94,0.3)",
              zIndex: 100,
              pointerEvents: "none",
              transition: "opacity 0.2s"
            }} />
          )}
          {/* Red flash overlay */}
          {redFlash && (
            <div style={{
              position: "absolute",
              inset: 0,
              background: "rgba(239,68,68,0.4)",
              zIndex: 100,
              pointerEvents: "none",
              transition: "opacity 0.2s"
            }} />
          )}

          {/* Fly-in points animation */}
          {flyIns.map(fly => (
            <div
              key={fly.id}
              style={{
                position: "absolute",
                left: fly.x,
                top: fly.y,
                fontSize: 32,
                fontWeight: 900,
                color: "#FFD600",
                pointerEvents: "none",
                zIndex: 200,
                animation: "flyin 1s cubic-bezier(.23,1.02,.64,.99) forwards"
              }}
            >
              +100 <span role="img" aria-label="star">⭐</span>
            </div>
          ))}
          {/* Meme popup on wrong click */}
          {memePopup && (
            <div
              style={{
                position: "absolute",
                left: memePopup.x - 60,
                top: memePopup.y - 120,
                zIndex: 300,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pointerEvents: "none",
                animation: "memepopup 1s cubic-bezier(.23,1.02,.64,.99)"
              }}
            >
              <img
                src={memePopup.img}
                alt="Meme"
                style={{
                  width: 120,
                  height: 120,
                  objectFit: "contain",
                  borderRadius: 20,
                  boxShadow: "0 4px 24px #000a"
                }}
              />
              <div
                style={{
                  marginTop: 8,
                  background: "#181818cc",
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: 18,
                  borderRadius: 12,
                  padding: "6px 18px",
                  fontFamily: 'Comic Sans MS, Comic Sans, Ayuthaya, Arial Rounded MT Bold, Chalkboard SE, Chalkboard, Congenial, cursive',
                  textShadow: "2px 2px 8px #000, 0 0 12px #f0f"
                }}
              >
                {memePopup.text}
              </div>
            </div>
          )}
          {/* Kiss-cam overlay as background */}
          {kissCam && (
            <img
              src="/assets/kiss-cam.png"
              alt="Kiss Cam Overlay"
              style={{
                position: "absolute",
                left: ceoPos.x - CEO_RADIUS * 1.6,
                top: ceoPos.y - CEO_RADIUS * 1.6,
                width: CEO_RADIUS * 3.2,
                height: CEO_RADIUS * 3.2,
                zIndex: 8,
                pointerEvents: "none",
                animation: "kisscam-pop 0.6s cubic-bezier(.23,1.02,.64,.99)",
                objectFit: "contain"
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

interface GameScreenProps {
  onGameEnd: (score: number, stats: { correct: number; memes: number; level: number }) => void;
}

const TOTAL_TIME = 30;
const LEVEL_INTERVALS = [5, 4, 3, 2, 1]; // seconds for each level
const QUALIFY_SCORE = 1500;

const GameScreen: React.FC<GameScreenProps> = ({ onGameEnd }) => {
  const [showFlash, setShowFlash] = useState(true);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [level, setLevel] = useState(1);
  const [points, setPoints] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [memes, setMemes] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ceoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Preload audio when game starts
  useEffect(() => {
    preloadAudio();
  }, []);

  // Play/stop background music
  useEffect(() => {
    if (!showFlash && soundOn) {
      bgMusic.play();
    } else {
      bgMusic.stop();
    }
    return () => {
      bgMusic.stop();
    };
  }, [showFlash, soundOn]);

  // CEO/mistress interval for current level
  const ceoInterval = LEVEL_INTERVALS[Math.min(level - 1, LEVEL_INTERVALS.length - 1)] * 1000;

  // Start timer after flash
  useEffect(() => {
    if (!showFlash && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
      return () => timerRef.current && clearInterval(timerRef.current);
    }
    if (timeLeft <= 0) {
      onGameEnd(points * 100, { correct, memes, level });
    }
  }, [showFlash, timeLeft, points, correct, memes, level, onGameEnd]);

  // Reset timer and state when session restarts
  useEffect(() => {
    if (showFlash) {
      setTimeLeft(TOTAL_TIME);
      setPoints(0);
      setCorrect(0);
      setMemes(0);
    }
  }, [showFlash, level]);

  // CEO/mistress auto-move logic
  const [ceoPos, setCeoPos] = useState(getRandomPosition());
  useEffect(() => {
    if (!showFlash && timeLeft > 0) {
      if (ceoTimerRef.current) clearTimeout(ceoTimerRef.current);
      ceoTimerRef.current = setTimeout(() => {
        setCeoPos(getRandomPosition());
      }, ceoInterval);
      return () => ceoTimerRef.current && clearTimeout(ceoTimerRef.current);
    }
  }, [timeLeft, setCeoPos, showFlash, ceoInterval]);

  // Correct tap handler
  const handleCorrectClick = () => {
    setPoints(p => p + 1);
    setCorrect(c => c + 1);
    if (soundOn) correctSound.play();
    // Animation logic handled in SpotlightCanvas
  };
  // Wrong tap handler
  const handleWrongClick = () => {
    setMemes(m => m + 1);
    if (soundOn) wrongSound.play();
  };

  // End session handler
  const handleEndSession = () => {
    setMenuOpen(false);
    onGameEnd(points * 100, { correct, memes, level });
  };

  if (showFlash) {
    return <FlashScreen onDone={() => setShowFlash(false)} />;
  }
  return (
    <>
      <SpotlightCanvas
        timeLeft={timeLeft}
        totalTime={TOTAL_TIME}
        session={level}
        points={points}
        onWrongClick={handleWrongClick}
        showFinalWarning={timeLeft <= 5}
        onCorrectClick={handleCorrectClick}
        ceoPos={ceoPos}
        setCeoPos={setCeoPos}
        soundOn={soundOn}
        setSoundOn={setSoundOn}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onEndSession={handleEndSession}
      />
    </>
  );
};

export default GameScreen;