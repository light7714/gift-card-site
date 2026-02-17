'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function ConfettiBurst() {
  useEffect(() => {
    const duration = 1800;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        startVelocity: 28,
        spread: 70,
        origin: { x: Math.random(), y: Math.random() * 0.6 }
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return null;
}
