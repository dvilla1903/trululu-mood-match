'use client';

import { motion } from 'framer-motion';
import { FLAVORS } from '@/lib/flavors';
import type { AnalysisResult } from '@/lib/types';
import FlavorCard from './FlavorCard';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ResultStepProps {
  result: AnalysisResult;
  onContinue: () => void;
}

export default function ResultStep({ result, onContinue }: ResultStepProps) {
  const flavor = FLAVORS[result.flavorId];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="relative flex flex-col items-center justify-center min-h-dvh px-6 py-12"
    >
      {/* Gradient background overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className={`fixed inset-0 bg-gradient-to-br ${flavor.gradient} opacity-20 -z-10`}
      />

      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-8">
        <FlavorCard flavor={flavor} result={result} />

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5, ease: EASE }}
          onClick={onContinue}
          className="px-8 py-3 rounded-2xl border border-white/20 text-white/70 text-sm hover:text-white hover:border-white/40 hover:bg-white/5 transition-all focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          Ver mi cierre
        </motion.button>
      </div>
    </motion.div>
  );
}
