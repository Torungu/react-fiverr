import { useState, useEffect } from "react";

/**
 * Custom hook for debouncing a value.
 *
 * @param {any} value - The value to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {any} - The debounced value.
 */
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Create a timer to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup the timer if the effect is re-run or the component is unmounted
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
