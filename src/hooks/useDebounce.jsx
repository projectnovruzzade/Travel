import { useState, useEffect } from "react";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handlerData = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      console.log("Clearing timeout for value:", value);
      clearTimeout(handlerData);
    };
  }, [value]);
  return debouncedValue;
}

export default useDebounce;