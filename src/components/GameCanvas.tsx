import React, { useState } from "react";

// List your crowd images and meme images
const crowdImages = [
  "/crowd-images/crowd1.png",
  // Add more if you have them, e.g. "/crowd-images/crowd2.png"
];

const memeImages = [
  "/assets/meme1.png",
  "/assets/meme2.png",
  "/assets/meme3.png",
  // Add more if you have them
];

const ceoImage = "/assets/ceo.png";
const mistressImage = "/assets/mistress.png";
const kissCamImage = "/assets/kiss-cam.png";

const CEO_POSITION = { left: 200, top: 300 };
const MISTRESS_POSITION = { left: 270, top: 300 };

const GameCanvas = ({ onGameEnd }: { onGameEnd: (score: number) => void }) => {
  // Pick a random crowd image for each game
  const [crowdImage] = useState(
    crowdImages[Math.floor(Math.random() * crowdImages.length)]
  );

  // Meme popup state
  const [showMeme, setShowMeme] = useState(false);
  const [memeSrc, setMemeSrc] = useState("");

  // Example: Show meme on incorrect click
  const handleIncorrectClick = () => {
    const randomMeme = memeImages[Math.floor(Math.random() * memeImages.length)];
    setMemeSrc(randomMeme);
    setShowMeme(true);
    setTimeout(() => setShowMeme(false), 1000); // Hide after 1 second
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {/* Crowd background */}
      <img
        src={crowdImage}
        alt="Crowd"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* CEO and Mistress overlay (example positions) */}
      <img
        src={ceoImage}
        alt="CEO"
        style={{ position: "absolute", left: CEO_POSITION.left, top: CEO_POSITION.top, width: 60 }}
      />
      <img
        src={mistressImage}
        alt="Mistress"
        style={{ position: "absolute", left: MISTRESS_POSITION.left, top: MISTRESS_POSITION.top, width: 60 }}
      />

      {/* Kiss-cam overlay (conditionally render) */}
      {/* <img src={kissCamImage} alt="Kiss Cam" style={{ ... }} /> */}

      {/* Meme popup on incorrect click */}
      {showMeme && (
        <img
          src={memeSrc}
          alt="Meme"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 200,
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
        />
      )}

      {/* Example: Button to simulate incorrect click */}
      <button
        style={{ position: "absolute", bottom: 20, left: 20, zIndex: 20 }}
        onClick={handleIncorrectClick}
      >
        Simulate Incorrect Click
      </button>
    </div>
  );
};

export default GameCanvas; 