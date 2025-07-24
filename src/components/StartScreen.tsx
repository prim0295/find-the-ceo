import React from "react";

const StartScreen = ({ onStart }: { onStart: () => void }) => (
  <div className="start-screen">
    <h1>Find the CEO</h1>
    <button onClick={onStart}>Start Game</button>
  </div>
);

export default StartScreen; 