import { useCallback, useEffect, useRef, useState } from "react";

export const useCountDown = (
  initialSeconds: number,
  onComplete: () => void,
) => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);

  const [isActive, setIsActive] = useState<boolean>(false);

  const savedCallback = useRef<(() => void) | undefined>(onComplete);

  useEffect(() => {
    savedCallback.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isActive || seconds <= 0) return;

    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive, seconds]);

  const start = useCallback(() => setIsActive(true), []);

  const pause = useCallback(() => setIsActive(false), []);

  const reset = useCallback(() => {
    setIsActive(false);
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (seconds <= 0) {
      setIsActive(false);

      if (savedCallback.current) savedCallback.current();
    }
  }, [seconds]);

  return { seconds, start, pause, reset };
};
