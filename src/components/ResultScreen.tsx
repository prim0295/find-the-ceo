import React from "react";

interface ResultScreenProps {
  score: number;
  stats: { correct: number; time: number };
  onRestart: () => void;
  onBackToWelcome: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, stats, onRestart, onBackToWelcome }) => (
  <div style={{ textAlign: "center", padding: 40 }}>
    <h2>Results</h2>
    <div>Correct Taps: {stats.correct}</div>
    <div>Time Used: {stats.time} sec</div>
    <div>Points: {score}</div>
    <button onClick={onRestart}>Play Next Session</button>
    <button onClick={onBackToWelcome}>Back to Welcome</button>
    <div style={{ marginTop: 20 }}>
      <button>Share Meme Reaction</button>
    </div>
  </div>
);

export default ResultScreen;
