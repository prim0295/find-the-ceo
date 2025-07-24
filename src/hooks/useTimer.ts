import { useEffect, useState } from "react";

export function useTimer(initial: number, onEnd: () => void) {
  const [time, setTime] = useState(initial);

  useEffect(() => {
    if (time <= 0) {
      onEnd();
      return;
    }
    const interval = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [time, onEnd]);

  return time;
} 