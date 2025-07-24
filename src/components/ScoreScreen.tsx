import React from "react";

interface ScoreScreenProps {
  score: number;
  onShowLeaderboard: () => void;
  onRestart: () => void;
}

const ScoreScreen: React.FC<ScoreScreenProps> = ({ score, onShowLeaderboard, onRestart }) => (
  <div className="score-screen">
    <h2>Your Score: {score}</h2>
    <button onClick={onRestart}>Play Again</button>
    <button onClick={onShowLeaderboard}>Leaderboard</button>
  </div>
);

export default ScoreScreen; 