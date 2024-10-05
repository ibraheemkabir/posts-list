import {renderHook} from '@testing-library/react'

import useDebounce from '../../hooks/useDebounce';

jest.useFakeTimers();

describe("Debounce hook test", () => {
    it("should ensure debounce hook is only called once", async () => {
        const func = jest.fn();
        const utils = renderHook(() => useDebounce(func, 500));
        renderHook(() => useDebounce(func, 500));
        renderHook(() => useDebounce(func, 500));
    
        jest.advanceTimersByTime(250);
    
        utils.result.current('test');
    
        jest.runAllTimers();
    
        // ensure callback function is only called 1 time
        expect(func).toBeCalledTimes(1);
    });
});
