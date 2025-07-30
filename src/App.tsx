import React, { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import GameScreen from "./components/GameScreen";
import ResultScreen from "./components/ResultScreen";
type Screen = "welcome" | "game" | "result";

const App = () => {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState({ correct: 0, memes: 0, level: 1 });

  const handleGameEnd = (score: number, stats: { correct: number; memes: number; level: number }) => {
    setScore(score);
    setStats(stats);
    setScreen("result");
  };

  const handleRestart = () => {
    // Only increment level when user qualified (this will be handled in ResultScreen)
    setScreen("game");
  };

  const handleLevelUp = () => {
    // Increment level when user qualifies
    setStats(prev => ({ ...prev, level: prev.level + 1 }));
  };

  const handleBackToWelcome = () => {
    // Reset level when going back to welcome
    setStats({ correct: 0, memes: 0, level: 1 });
    setScreen("welcome");
  };

  return (
    <>
      {screen === "welcome" && (
        <WelcomeScreen onStart={() => setScreen("game")} />
      )}
      {screen === "game" && (
        <GameScreen
          level={stats.level}
          onGameEnd={handleGameEnd}
        />
      )}
      {screen === "result" && (
        <ResultScreen
          score={score}
          stats={stats}
          onRestart={handleRestart}
          onBackToWelcome={handleBackToWelcome}
          onLevelUp={handleLevelUp}
        />
      )}
    </>
  );
};

export default App;
