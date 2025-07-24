export async function fetchLevel() {
  const res = await fetch("/api/game/level");
  return res.json();
}

export async function fetchLeaderboard() {
  const res = await fetch("/api/leaderboard");
  return res.json();
} 