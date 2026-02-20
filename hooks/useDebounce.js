import { useCallback, useEffect, useRef } from "react";

export const useDebounce = (callback, delay) => {
  const timeoutIdRef = useRef(null);

  const debouncedCallback = useCallback(
    (...args) => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      timeoutIdRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};
