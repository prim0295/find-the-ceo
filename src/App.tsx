import React, { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import GameScreen from "./components/GameScreen";
import ResultScreen from "./components/ResultScreen";

type Screen = "welcome" | "game" | "result";

const App = () => {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState({ correct: 0, time: 0 });

  return (
    <>
      {screen === "welcome" && (
        <WelcomeScreen onStart={() => setScreen("game")} />
      )}
      {screen === "game" && (
        <GameScreen
          onGameEnd={(score, stats) => {
            setScore(score);
            setStats(stats);
            setScreen("result");
          }}
        />
      )}
      {screen === "result" && (
        <ResultScreen
          score={score}
          stats={stats}
          onRestart={() => setScreen("game")}
          onBackToWelcome={() => setScreen("welcome")}
        />
      )}
    </>
  );
};

export default App;
