import { useEffect, useState } from "react";

function useDebounced(value, time = 500) {
  const [valueDebounced, setValueDebounced] = useState(value);
  useEffect(() => {
    const timeDelay = setTimeout(() => setValueDebounced(value), time);
    return () => clearTimeout(timeDelay);
  }, [time, value]);
  return valueDebounced;
}

export default useDebounced;
