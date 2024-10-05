import { useEffect, useMemo, useRef } from 'react';
import debounce from 'lodash.debounce';

type Callback = (...props: any[]) => void;

/**
 * useDebounce hook to optimise search input and delay filtering for time specified.
 * @param callback 
 * @param delay 
 * @returns func
 */
export const useDebounce = <T extends Callback>(callback: T, delay: number = 700) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = callback as any;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = (evt: any) => {
      if (ref.current) {
        (ref.current as Callback)(evt);
      }
    };
    return debounce(func, delay);
  }, [delay]);

  return debouncedCallback;
};

export default useDebounce;
