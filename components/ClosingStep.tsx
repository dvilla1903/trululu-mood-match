'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { FlavorId } from '@/lib/flavors';
import { FLAVORS } from '@/lib/flavors';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CLOSING_PHRASES = [
  'Tu niño interior sigue aquí.',
  'Crecer no significa dejar atrás al niño interior.',
];

interface ClosingStepProps {
  flavorId: FlavorId;
  onRestart: () => void;
}

export default function ClosingStep({ flavorId, onRestart }: ClosingStepProps) {
  const flavor = FLAVORS[flavorId];
  const phrase = useMemo(
    () => CLOSING_PHRASES[Math.floor(Math.random() * CLOSING_PHRASES.length)],
    []
  );
  const words = phrase.split(' ');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="relative flex flex-col items-center justify-center min-h-dvh px-6 py-12"
    >
      {/* Subtle halo of the flavor color */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse at center, ${flavor.accentColor}15 0%, transparent 60%)`,
        }}
      />

      <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-16">
        {/* Animated phrase */}
        <h2 className="text-4xl md:text-6xl font-medium text-center leading-snug tracking-wide font-[family-name:var(--font-fraunces)]">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3 + i * 0.15,
                duration: 0.6,
                ease: EASE,
              }}
              className="inline-block mr-[0.3em] text-white"
            >
              {word}
            </motion.span>
          ))}
        </h2>

        {/* Trululu brand */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8, ease: EASE }}
          className="flex flex-col items-center gap-4"
        >
          <img
            src="/hero-gummies.png"
            alt="Trululu Aros"
            className="w-64 md:w-80 object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]"
          />
          <div className="flex flex-col items-center gap-1">
            <p className="text-2xl font-semibold tracking-tight text-white/60">
              Trululu
            </p>
            <p className="text-sm tracking-[0.3em] uppercase text-white/30">
              Aros
            </p>
          </div>
        </motion.div>

        {/* Restart button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5, ease: EASE }}
          onClick={onRestart}
          className="px-6 py-2.5 rounded-full text-white/40 text-sm hover:text-white/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
        >
          Probar otra vez
        </motion.button>
      </div>
    </motion.div>
  );
}
