import React from "react";

const Leaderboard = ({ onBack }: { onBack: () => void }) => (
  <div className="leaderboard">
    <h2>Leaderboard</h2>
    <button onClick={onBack}>Back</button>
  </div>
);

export default Leaderboard; 