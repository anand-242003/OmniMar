import { useState, useEffect, useRef } from 'react';

/**
 * Hook to smoothly count numbers up or down over a specified duration.
 * Respects prefers-reduced-motion by snapping instantly when enabled.
 */
export function useAnimatedNumber(targetValue: number, duration = 500): number {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const startValueRef = useRef(targetValue);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // If reduced motion is preferred or duration is 0, snap directly
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || duration <= 0) {
      setDisplayValue(targetValue);
      startValueRef.current = targetValue;
      return;
    }

    const startVal = startValueRef.current;
    if (Math.abs(startVal - targetValue) < 0.001) return;

    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (targetValue - startVal) * eased;
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        startValueRef.current = targetValue;
        setDisplayValue(targetValue);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [targetValue, duration]);

  return displayValue;
}
