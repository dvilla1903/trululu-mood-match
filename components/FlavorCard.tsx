'use client';

import { motion } from 'framer-motion';
import type { Flavor } from '@/lib/flavors';
import type { AnalysisResult } from '@/lib/types';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface FlavorCardProps {
  flavor: Flavor;
  result: AnalysisResult;
}

export default function FlavorCard({ flavor, result }: FlavorCardProps) {
  return (
    <div className="glass-card p-8 md:p-10 w-full max-w-md mx-auto flex flex-col items-center gap-6">
      {/* Mood pill */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
        className="px-4 py-1.5 rounded-full text-sm font-medium"
        style={{
          background: `${flavor.accentColor}25`,
          color: flavor.accentColor,
          border: `1px solid ${flavor.accentColor}40`,
        }}
      >
        {result.detectedMood}
      </motion.div>

      {/* Flavor image */}
      <motion.img
        src={flavor.image}
        alt={flavor.name}
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.6,
          type: 'spring',
          stiffness: 200,
          damping: 12,
        }}
        className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]"
      />

      {/* Name */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
        className="text-4xl md:text-5xl font-bold text-white text-center"
      >
        Eres {flavor.name}
      </motion.h2>

      {/* Personal message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5, ease: EASE }}
        className="text-lg md:text-xl text-white/80 text-center italic font-light leading-relaxed"
      >
        {result.personalMessage}
      </motion.p>

      {/* Energy level */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5, ease: EASE }}
        className="flex flex-col items-center gap-2"
      >
        <p className="text-xs text-white/40 uppercase tracking-widest">
          Nivel de energía
        </p>
        <div className="flex gap-1.5" aria-label={`Energía: ${result.energyLevel} de 10`}>
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9 + i * 0.05, duration: 0.3 }}
              className="energy-dot"
              style={{
                background:
                  i < result.energyLevel
                    ? flavor.accentColor
                    : 'rgba(255,255,255,0.1)',
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
