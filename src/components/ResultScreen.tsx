import React, { useState } from "react";
import html2canvas from 'html2canvas';
import { getDeviceType, getScreenDimensions } from '../utils/deviceDetection';

interface ResultScreenProps {
  score: number;
  stats: { correct: number; memes: number; level: number };
  onRestart: () => void;
  onBackToWelcome: () => void;
  onLevelUp?: () => void; // New prop for level progression
}

const BASE_QUALIFY_SCORE = 500;
const QUALIFY_SCORE_INCREMENT = 200;

const FAIL_MESSAGES = [
  "Your spotting skills are so bad, even the CEO filed a restraining order—he doesn't want to be found by you.",
  "If missing the obvious were an Olympic sport, you'd be on the podium—with binoculars, still searching.",
  "You had one job. Find the CEO. Instead, you found 37 wrong people and 3 churro stands.",
  "Even the meme characters are worried about your decision-making.",
  "Try again, legend. This time, maybe try using your eyes instead of your vibes."
];

const ResultScreen: React.FC<ResultScreenProps> = ({ score, stats, onRestart, onBackToWelcome, onLevelUp }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareImage, setShareImage] = useState<string | null>(null);
  
  // Calculate qualification score based on level
  const qualifyScore = BASE_QUALIFY_SCORE + (stats.level - 1) * QUALIFY_SCORE_INCREMENT;
  const qualified = score >= qualifyScore;
  const failMessage = FAIL_MESSAGES[Math.floor(Math.random() * FAIL_MESSAGES.length)];
  const screenDimensions = getScreenDimensions();
  const isMobile = screenDimensions.deviceType === 'mobile';
  const isTablet = screenDimensions.deviceType === 'tablet';

  const handleRestart = () => {
    if (qualified && onLevelUp) {
      // User qualified - advance to next level
      onLevelUp();
    }
    onRestart();
  };

  const generateShareText = () => {
    const baseText = `I scored ${score} points on Spot the CEO (Level ${stats.level})! Can you beat my meme skills? 😂🎯`;
    return baseText;
  };

  const shareToPlatform = async (platform: string) => {
    const text = generateShareText();
    const url = window.location.origin;
    
    let shareUrl = '';
    let fallbackAction = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=SpotTheCEO,MemeGame`;
        fallbackAction = 'Open Twitter/X app';
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        fallbackAction = 'Open Facebook app';
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        fallbackAction = 'Open WhatsApp';
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent('Spot the CEO - Meme Game')}&summary=${encodeURIComponent(text)}`;
        fallbackAction = 'Open LinkedIn app';
        break;
      case 'instagram':
        // Instagram doesn't support direct web sharing, so we'll provide instructions
        fallbackAction = 'Take screenshot and post to Instagram';
        break;
      case 'tiktok':
        // TikTok doesn't support direct web sharing, so we'll provide instructions
        fallbackAction = 'Take screenshot and post to TikTok';
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    } else {
      // For platforms that don't support direct sharing, show instructions
      alert(`${fallbackAction}\n\nText to copy:\n${text}\n\nURL: ${url}`);
    }
  };

  const handleShare = async () => {
    const resultDiv = document.getElementById('result-screen');
    if (!resultDiv) return;

    try {
      // Capture screenshot
      const canvas = await html2canvas(resultDiv, {
        backgroundColor: null,
        scale: 2, // Higher quality for mobile
        useCORS: true
      });
      
      const imageData = canvas.toDataURL('image/png');
      setShareImage(imageData);
      setShowShareModal(true);
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
      // Fallback to text-only sharing
      setShowShareModal(true);
    }
  };

  const downloadImage = () => {
    if (!shareImage) return;
    
    const link = document.createElement('a');
    link.download = 'spot-the-ceo-score.png';
    link.href = shareImage;
    link.click();
  };

  const ShareModal = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: isMobile ? 16 : 24
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #ff7ce5 0%, #a78bfa 50%, #facc15 100%)',
        borderRadius: isMobile ? 16 : 20,
        padding: isMobile ? 20 : 24,
        maxWidth: isMobile ? '100%' : 500,
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        border: '3px solid #fff',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: isMobile ? 16 : 20
        }}>
          <h2 style={{
            fontSize: isMobile ? 20 : 24,
            color: '#fff',
            fontWeight: 'bold',
            margin: 0
          }}>
            📤 Share Your Score
          </h2>
          <button
            onClick={() => setShowShareModal(false)}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: isMobile ? 32 : 36,
              height: isMobile ? 32 : 36,
              color: '#fff',
              fontSize: isMobile ? 18 : 20,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ✕
          </button>
        </div>

        {shareImage && (
          <div style={{
            marginBottom: isMobile ? 16 : 20,
            textAlign: 'center'
          }}>
            <img
              src={shareImage}
              alt="Your Score"
              style={{
                maxWidth: '100%',
                maxHeight: isMobile ? 200 : 250,
                borderRadius: 12,
                border: '2px solid #fff'
              }}
            />
            <button
              onClick={downloadImage}
              style={{
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                border: '2px solid #fff',
                borderRadius: 8,
                padding: '8px 16px',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: isMobile ? 14 : 16,
                cursor: 'pointer',
                marginTop: 8
              }}
            >
              📥 Download Image
            </button>
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr',
          gap: isMobile ? 12 : 16
        }}>
          {[
            { name: 'X (Twitter)', icon: '🐦', color: '#1da1f2', platform: 'twitter' },
            { name: 'Facebook', icon: '📘', color: '#4267B2', platform: 'facebook' },
            { name: 'WhatsApp', icon: '💬', color: '#25D366', platform: 'whatsapp' },
            { name: 'LinkedIn', icon: '💼', color: '#0077b5', platform: 'linkedin' },
            { name: 'Instagram', icon: '📸', color: '#E1306C', platform: 'instagram' },
            { name: 'TikTok', icon: '🎵', color: '#010101', platform: 'tiktok' }
          ].map((platform) => (
            <button
              key={platform.platform}
              onClick={() => shareToPlatform(platform.platform)}
              style={{
                background: `linear-gradient(135deg, ${platform.color} 0%, ${platform.color}dd 100%)`,
                border: '2px solid #fff',
                borderRadius: isMobile ? 12 : 16,
                padding: isMobile ? '12px 8px' : '16px 12px',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: isMobile ? 12 : 14,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = 'scale(1)';
              }}
            >
              <span style={{ fontSize: isMobile ? 20 : 24 }}>{platform.icon}</span>
              <span>{platform.name}</span>
            </button>
          ))}
        </div>

        <div style={{
          marginTop: isMobile ? 16 : 20,
          padding: isMobile ? 12 : 16,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 8,
          fontSize: isMobile ? 12 : 14,
          color: '#fff',
          textAlign: 'center'
        }}>
          💡 Tip: For Instagram & TikTok, download the image and post it to your story or feed!
        </div>
    </div>
  </div>
);

  return (
    <>
      <div
        id="result-screen"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ff7ce5 0%, #a78bfa 50%, #facc15 100%)",
          fontFamily: 'Comic Sans MS, Comic Sans, Ayuthaya, Arial Rounded MT Bold, Chalkboard SE, Chalkboard, Congenial, cursive',
          padding: isMobile ? 16 : isTablet ? 24 : 32,
          textAlign: "center",
          overflow: "hidden"
        }}
      >
        <h1
          style={{
            fontSize: isMobile ? 32 : isTablet ? 40 : 56,
            fontWeight: "900",
            color: "#fff",
            textShadow: "2px 2px 8px #000, 0 0 24px #ff0",
            marginBottom: isMobile ? 12 : 16
          }}
        >
          {qualified ? "🎉 Session Complete! 🎉" : "👎 You Lost 👎"}
        </h1>
        <div style={{ 
          fontSize: isMobile ? 18 : isTablet ? 20 : 24, 
          color: "#fff", 
          fontWeight: "900", 
          marginBottom: isMobile ? 8 : 12 
        }}>
          Level: {stats.level}
        </div>
        <div style={{ 
          marginBottom: isMobile ? 24 : 32,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          gap: isMobile ? 8 : 16
        }}>
          <span
            style={{
              fontSize: isMobile ? 20 : isTablet ? 22 : 28,
              color: "#FFD600",
              fontWeight: "900",
              textShadow: "1px 1px 4px #000"
            }}
          >
            You scored
          </span>
          <span
            style={{
              fontSize: isMobile ? 36 : isTablet ? 42 : 48,
              color: "#22c55e",
              fontWeight: "900",
              marginLeft: isMobile ? 0 : 16,
              marginRight: isMobile ? 0 : 16,
              textShadow: "2px 2px 8px #000, 0 0 24px #fff"
            }}
          >
            {score} points
          </span>
          <span
            style={{
              fontSize: isMobile ? 20 : isTablet ? 22 : 28,
              color: "#FFD600",
              fontWeight: "900",
              textShadow: "1px 1px 4px #000"
            }}
          >
            !
          </span>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 12 : 20,
          marginBottom: isMobile ? 24 : 32,
          maxWidth: isMobile ? "100%" : "600px",
          width: "100%"
        }}>
          <div style={{
            background: "rgba(34, 197, 94, 0.9)",
            border: "3px solid #16a34a",
            borderRadius: isMobile ? 12 : 16,
            padding: isMobile ? 16 : 20,
            color: "#fff",
            fontWeight: "bold"
          }}>
            <div style={{ fontSize: isMobile ? 16 : 18, marginBottom: 4 }}>
              ✅ Correct Taps
            </div>
            <div style={{ fontSize: isMobile ? 24 : 28, fontWeight: "900" }}>
              {stats.correct}
            </div>
          </div>
          <div style={{
            background: "rgba(239, 68, 68, 0.9)",
            border: "3px solid #dc2626",
            borderRadius: isMobile ? 12 : 16,
            padding: isMobile ? 16 : 20,
            color: "#fff",
            fontWeight: "bold"
          }}>
            <div style={{ fontSize: isMobile ? 16 : 18, marginBottom: 4 }}>
              😂 Memes Caught
            </div>
            <div style={{ fontSize: isMobile ? 24 : 28, fontWeight: "900" }}>
              {stats.memes}
            </div>
          </div>
        </div>

        {/* Qualification Message */}
        {qualified ? (
          <div style={{
            background: "linear-gradient(135deg, rgba(34, 197, 94, 0.7) 0%, rgba(22, 163, 74, 0.7) 50%, rgba(16, 185, 129, 0.7) 100%)",
            border: "3px solid rgba(22, 163, 74, 0.8)",
            borderRadius: isMobile ? 12 : 16,
            padding: isMobile ? 16 : 20,
            marginBottom: isMobile ? 24 : 32,
            maxWidth: isMobile ? "100%" : "600px",
            backdropFilter: "blur(15px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
          }}>
            <div style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: isMobile ? 18 : 22,
              marginBottom: isMobile ? 8 : 12
            }}>
              🎉 CONGRATULATIONS! 🎉
            </div>
            <div style={{
              color: "#fff",
              fontSize: isMobile ? 14 : 16
            }}>
              You've qualified for the next level! Your CEO-spotting skills are legendary!
            </div>
          </div>
        ) : (
          <div style={{
            background: "linear-gradient(135deg, rgba(251, 191, 36, 0.7) 0%, rgba(245, 158, 11, 0.7) 50%, rgba(239, 68, 68, 0.7) 100%)",
            border: "3px solid rgba(245, 158, 11, 0.8)",
            borderRadius: isMobile ? 12 : 16,
            padding: isMobile ? 16 : 20,
            marginBottom: isMobile ? 24 : 32,
            maxWidth: isMobile ? "100%" : "600px",
            backdropFilter: "blur(15px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
          }}>
            <div style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: isMobile ? 18 : 22,
              marginBottom: isMobile ? 8 : 12
            }}>
              😅 Oops! Not quite there...
            </div>
            <div style={{
              color: "#fff",
              fontSize: isMobile ? 14 : 16
            }}>
              {failMessage}
            </div>
          </div>
        )}

        {/* Meme Image */}
        <div style={{
          marginBottom: isMobile ? 24 : 32,
          textAlign: "center"
        }}>
          <img
            src="/assets/meme1.png"
            alt="Meme Reaction"
            style={{
              width: isMobile ? 120 : isTablet ? 150 : 180,
              height: "auto",
              borderRadius: isMobile ? 12 : 16,
              border: "2px solid #fff",
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)"
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 12 : 16,
          marginBottom: isMobile ? 24 : 32
        }}>
          {qualified ? (
            <button
              onClick={handleRestart}
              style={{
                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                border: "3px solid #fff",
                borderRadius: isMobile ? 12 : 16,
                padding: isMobile ? "16px 32px" : "20px 40px",
                color: "#fff",
                fontWeight: "bold",
                fontSize: isMobile ? 18 : 22,
                cursor: "pointer",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = "scale(1)";
              }}
            >
              🚀 Next Level
            </button>
          ) : (
            <button
              onClick={handleRestart}
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                border: "3px solid #fff",
                borderRadius: isMobile ? 12 : 16,
                padding: isMobile ? "16px 32px" : "20px 40px",
                color: "#fff",
                fontWeight: "bold",
                fontSize: isMobile ? 18 : 22,
                cursor: "pointer",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = "scale(1)";
              }}
            >
              🔄 Retry
            </button>
          )}
          <button
            onClick={onBackToWelcome}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "3px solid #fff",
              borderRadius: isMobile ? 12 : 16,
              padding: isMobile ? "16px 32px" : "20px 40px",
              color: "#fff",
              fontWeight: "bold",
              fontSize: isMobile ? 18 : 22,
              cursor: "pointer",
              backdropFilter: "blur(4px)",
              transition: "transform 0.2s ease"
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = "scale(1)";
            }}
          >
            🏠 Back to Menu
          </button>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
            border: "3px solid #fff",
            borderRadius: isMobile ? 12 : 16,
            padding: isMobile ? "16px 32px" : "20px 40px",
            color: "#fff",
            fontWeight: "bold",
            fontSize: isMobile ? 18 : 22,
            cursor: "pointer",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            transition: "transform 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: 8
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.transform = "scale(1)";
          }}
        >
          <span style={{ fontSize: isMobile ? 20 : 24 }}>📤</span>
          Share Score
          <span style={{ fontSize: isMobile ? 20 : 24 }}>📤</span>
        </button>
      </div>

      {showShareModal && <ShareModal />}
    </>
  );
};

export default ResultScreen;