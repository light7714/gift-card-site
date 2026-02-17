'use client';

import { motion } from 'framer-motion';

const driftingHearts = Array.from({ length: 16 }).map((_, i) => ({
  id: i,
  left: `${4 + i * 6}%`,
  delay: i * 0.45,
  duration: 9 + (i % 5),
  size: 12 + (i % 4) * 4
}));

const topHearts = Array.from({ length: 14 }).map((_, i) => ({
  id: i,
  left: `${2 + i * 7}%`,
  delay: i * 0.2
}));

export default function AmbientHearts() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-x-0 top-0 h-16">
        {topHearts.map((heart) => (
          <motion.span
            key={`top-${heart.id}`}
            className="absolute -top-1 text-xl text-rose-400/60"
            style={{ left: heart.left }}
            animate={{ y: [0, 5, 0], opacity: [0.45, 0.75, 0.45] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: heart.delay
            }}
          >
            ❤
          </motion.span>
        ))}
      </div>

      {driftingHearts.map((heart) => (
        <motion.span
          key={`float-${heart.id}`}
          className="absolute text-rose-300/45"
          style={{ left: heart.left, fontSize: `${heart.size}px` }}
          initial={{ y: '105vh', opacity: 0 }}
          animate={{ y: '-12vh', opacity: [0, 0.7, 0] }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: heart.delay
          }}
        >
          ♡
        </motion.span>
      ))}
    </div>
  );
}
