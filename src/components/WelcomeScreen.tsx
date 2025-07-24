import React from "react";

const WelcomeScreen = ({ onStart }: { onStart: () => void }) => (
  <div
    style={{
      textAlign: "center",
      padding: 40,
      fontFamily: 'Comic Sans MS, Comic Sans, cursive',
      background: "#181818",
      minHeight: "100vh",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <h1
      style={{
        fontSize: 48,
        color: "#00ffff",
        textShadow: "2px 2px 0 #ff00ff, 4px 4px 0 #ffff00",
        marginBottom: 20
      }}
    >
      Where’s the CEO?
    </h1>
    <img
      src="/assets/ceo-mistress-frame2.png"
      alt="CEO and Mistress"
      style={{
        width: 320,
        maxWidth: "80vw",
        border: "6px solid #ff00ff",
        borderRadius: 24,
        boxShadow: "0 0 40px #00ffff, 0 0 80px #ffff00",
        marginBottom: 32,
        background: "#000"
      }}
    />
    <button
      onClick={onStart}
      style={{
        fontFamily: 'Comic Sans MS, Comic Sans, cursive',
        fontSize: 32,
        background: "#ffff00",
        color: "#181818",
        border: "4px solid #00ffff",
        borderRadius: 16,
        padding: "16px 48px",
        marginBottom: 24,
        cursor: "pointer",
        boxShadow: "0 0 20px #ff00ff"
      }}
    >
      Start Game
    </button>
    <div style={{ marginTop: 10 }}>
      <button
        style={{
          fontFamily: 'Comic Sans MS, Comic Sans, cursive',
          fontSize: 20,
          background: "#ff00ff",
          color: "#fff",
          border: "2px solid #00ffff",
          borderRadius: 10,
          padding: "8px 24px",
          cursor: "pointer",
          boxShadow: "0 0 10px #ffff00"
        }}
      >
        Sound: On/Off
      </button>
    </div>
  </div>
);

export default WelcomeScreen;
