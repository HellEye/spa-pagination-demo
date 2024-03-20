import { useEffect, useState } from "react";
/**
 * Hook that manages state with debouncing
 *
 * Provides both actual value to use when binding with UI components, and debounced value to use with API requests
 *
 * @param initialValue initial value for state
 * @param delay delay before changing the debounced state
 * @returns tuple with the current value, the debounced value, and a function to update the value
 */
export const useDebouncedState = <T>(
  initialValue: T,
  delay: number
): [T, T, React.Dispatch<React.SetStateAction<T>>] => {
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return [value, debouncedValue, setValue];
};

/**
 * Hook that debounces a value
 *
 * @param value value to debounce
 * @param delay delay before changing the debounced value
 * @returns debounced value
 */
export const useDebouncedValue = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
};
