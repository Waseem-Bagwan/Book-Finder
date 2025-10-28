import { useState, useEffect } from "react";

const useDebounce = (value, delay = 500) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    // remove the old settime 
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

export default useDebounce
