export function calculateScore(elapsedMs: number) {
  return Math.max(0, 1000 - Math.floor(elapsedMs / 10));
} 