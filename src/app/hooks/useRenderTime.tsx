import { useEffect, useRef } from 'react';

export const useRenderTime = (componentName: string) => {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;
    renderCount.current += 1;

    console.log(`[${componentName}] Render #${renderCount.current} took ${renderTime.toFixed(2)}ms`);

    // Reset the start time for the next render
    startTime.current = performance.now();

    // Cleanup function
    return () => {
      console.log(`[${componentName}] Component unmounted after ${renderCount.current} renders`);
    };
  });
};
