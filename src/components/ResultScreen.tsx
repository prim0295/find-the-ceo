import React from "react";
import html2canvas from 'html2canvas';

interface ResultScreenProps {
  score: number;
  stats: { correct: number; memes: number; level: number };
  onRestart: () => void;
  onBackToWelcome: () => void;
}

const QUALIFY_SCORE = 1500;

const FAIL_MESSAGES = [
  "Your spotting skills are so bad, even the CEO filed a restraining order—he doesn’t want to be found by you.",
  "If missing the obvious were an Olympic sport, you'd be on the podium—with binoculars, still searching.",
  "You had one job. Find the CEO. Instead, you found 37 wrong people and 3 churro stands.",
  "Even the meme characters are worried about your decision-making.",
  "Try again, legend. This time, maybe try using your eyes instead of your vibes."
];

const shareScore = (score: number, level: number) => {
  const text = `I scored ${score} points on Spot the CEO (Level ${level})! Can you beat my meme skills? 😂🎯`;
  const url = window.location.origin;
  const twitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
  // Instagram and TikTok do not support direct web sharing, so provide instructions
  // Open a simple share menu
  const win = window.open('', 'Share', 'width=400,height=500');
  if (win) {
    win.document.write(`
      <div style='font-family:Comic Sans MS,Comic Sans,cursive;text-align:center;padding:32px;'>
        <h2>Share your meme score!</h2>
        <a href='${twitter}' target='_blank' style='display:block;margin:16px;font-size:22px;color:#1da1f2;'>🐦 Share on X (Twitter)</a>
        <a href='${facebook}' target='_blank' style='display:block;margin:16px;font-size:22px;color:#4267B2;'>📘 Share on Facebook</a>
        <a href='${whatsapp}' target='_blank' style='display:block;margin:16px;font-size:22px;color:#25D366;'>💬 Share on WhatsApp</a>
        <hr style='margin:24px 0;border:0;border-top:2px dashed #aaa;'>
        <div style='margin:16px 0;font-size:22px;color:#E1306C;'>📸 Share on Instagram</div>
        <div style='margin-bottom:16px;font-size:16px;color:#888;'>Take a screenshot of your score and post it to your Instagram story or feed. Tag us for a chance to be featured!</div>
        <div style='margin:16px 0;font-size:22px;color:#010101;'>🎵 Share on TikTok</div>
        <div style='margin-bottom:16px;font-size:16px;color:#888;'>Take a screenshot and share it in your TikTok video or story. Use #SpotTheCEO!</div>
        <button onclick='window.close()' style='margin-top:32px;font-size:18px;padding:8px 32px;border-radius:12px;border:none;background:#facc15;color:#181818;font-weight:bold;cursor:pointer;'>Close</button>
      </div>
    `);
  }
};

const handleShare = async () => {
  const resultDiv = document.getElementById('result-screen');
  if (!resultDiv) return;

  // Capture screenshot
  const canvas = await html2canvas(resultDiv);
  canvas.toBlob(async (blob) => {
    if (!blob) return;
    const file = new File([blob], 'spot-the-ceo-score.png', { type: 'image/png' });

    // Try to use Web Share API with image (mobile browsers that support it)
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: 'Spot the CEO',
        text: 'Check out my score!',
      });
    } else {
      // Fallback: download the image and instruct user to share manually
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'spot-the-ceo-score.png';
      a.click();
      URL.revokeObjectURL(url);
      alert('Image downloaded! Share it on your favorite platform.');
    }
  });
};

const ResultScreen: React.FC<ResultScreenProps> = ({ score, stats, onRestart, onBackToWelcome }) => {
  const qualified = score >= QUALIFY_SCORE;
  const failMessage = FAIL_MESSAGES[Math.floor(Math.random() * FAIL_MESSAGES.length)];
  return (
    <div
      id="result-screen"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #ff7ce5 0%, #a78bfa 50%, #facc15 100%)",
        fontFamily: 'Comic Sans MS, Comic Sans, cursive',
        padding: 32,
        textAlign: "center"
      }}
    >
      <h1
        style={{
          fontSize: 56,
          fontWeight: 900,
          color: "#fff",
          textShadow: "2px 2px 8px #000, 0 0 24px #ff0",
          marginBottom: 16
        }}
      >
        🎉 Session Complete! 🎉
      </h1>
      <div style={{ fontSize: 24, color: "#fff", fontWeight: 900, marginBottom: 12 }}>
        Level: {stats.level}
      </div>
      <div style={{ marginBottom: 32 }}>
        <span
          style={{
            fontSize: 28,
            color: "#FFD600",
            fontWeight: 900,
            textShadow: "1px 1px 4px #000"
          }}
        >
          You scored
        </span>
        <span
          style={{
            fontSize: 48,
            color: "#22c55e",
            fontWeight: 900,
            marginLeft: 16,
            marginRight: 16,
            textShadow: "2px 2px 8px #000, 0 0 24px #fff"
          }}
        >
          {score} points
        </span>
        <span
          style={{
            fontSize: 28,
            color: "#FFD600",
            fontWeight: 900,
            textShadow: "1px 1px 4px #000"
          }}
        >
          !
        </span>
      </div>
      <div style={{ display: "flex", gap: 32, marginBottom: 32 }}>
        <div
          style={{
            background: "#fff8",
            borderRadius: 18,
            padding: "18px 36px",
            fontSize: 24,
            color: "#a78bfa",
            fontWeight: 900,
            boxShadow: "0 4px 24px #0002"
          }}
        >
          Correct Taps: {stats.correct}
        </div>
        <div
          style={{
            background: "#fff8",
            borderRadius: 18,
            padding: "18px 36px",
            fontSize: 24,
            color: "#f87171",
            fontWeight: 900,
            boxShadow: "0 4px 24px #0002"
          }}
        >
          Memes Caught: {stats.memes}
        </div>
      </div>
      <div style={{ marginBottom: 32 }}>
        <img
          src="/assets/meme1.png"
          alt="Meme"
          style={{
            width: 180,
            height: 180,
            borderRadius: 32,
            boxShadow: "0 8px 32px #000a",
            marginBottom: 16
          }}
        />
        <div
          style={{
            fontSize: 28,
            color: "#fff",
            fontWeight: 900,
            textShadow: "2px 2px 8px #000, 0 0 12px #f0f"
          }}
        >
          {qualified
            ? "Congrats! You qualify for the next level! 🎊"
            : failMessage}
        </div>
      </div>
      {qualified ? (
        <button
          onClick={onRestart}
          style={{
            fontFamily: 'Comic Sans MS, Comic Sans, cursive',
            fontSize: 28,
            background: "linear-gradient(90deg, #ec4899, #facc15)",
            color: "#181818",
            border: "4px solid #fff",
            borderRadius: 999,
            padding: "18px 60px",
            marginBottom: 18,
            cursor: "pointer",
            fontWeight: 900,
            boxShadow: "0 4px 24px #000a"
          }}
        >
          🚀 Next Level 🚀
        </button>
      ) : (
        <button
          onClick={onRestart}
          style={{
            fontFamily: 'Comic Sans MS, Comic Sans, cursive',
            fontSize: 28,
            background: "linear-gradient(90deg, #ec4899, #facc15)",
            color: "#181818",
            border: "4px solid #fff",
            borderRadius: 999,
            padding: "18px 60px",
            marginBottom: 18,
            cursor: "pointer",
            fontWeight: 900,
            boxShadow: "0 4px 24px #000a"
          }}
        >
          🔄 Retry 🔄
        </button>
      )}
      <button
        onClick={() => handleShare()}
        style={{
          fontFamily: 'Comic Sans MS, Comic Sans, cursive',
          fontSize: 22,
          background: "#fff8",
          color: "#ff00ff",
          border: "2px solid #ff00ff",
          borderRadius: 999,
          padding: "12px 40px",
          cursor: "pointer",
          fontWeight: 900,
          boxShadow: "0 2px 12px #0002",
          marginTop: 18
        }}
      >
        📣 Share Score
      </button>
      <button
        onClick={onBackToWelcome}
        style={{
          fontFamily: 'Comic Sans MS, Comic Sans, cursive',
          fontSize: 22,
          background: "#fff8",
          color: "#a78bfa",
          border: "2px solid #a78bfa",
          borderRadius: 999,
          padding: "12px 40px",
          cursor: "pointer",
          fontWeight: 900,
          boxShadow: "0 2px 12px #0002"
        }}
      >
        ⬅️ Back to Welcome
      </button>
  </div>
);
};

export default ResultScreen;