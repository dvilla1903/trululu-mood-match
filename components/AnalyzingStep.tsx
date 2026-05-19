'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const MESSAGES = [
  'Analizando tu expresión…',
  'Leyendo tu energía…',
  'Detectando tu mood…',
  'Encontrando tu sabor…',
];

interface AnalyzingStepProps {
  imagePreview: string;
}

export default function AnalyzingStep({ imagePreview }: AnalyzingStepProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="flex flex-col items-center justify-center min-h-dvh px-6 py-12"
    >
      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-10">
        {/* Image with scan effect */}
        <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-3xl overflow-hidden">
          <img
            src={imagePreview}
            alt="Tu foto siendo analizada"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30" />
          {/* Scan line */}
          <motion.div
            className="scan-line absolute left-0 right-0 h-1"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), rgba(168,85,247,0.8), rgba(255,255,255,0.6), transparent)',
              boxShadow: '0 0 20px rgba(168,85,247,0.5)',
            }}
          />
          {/* Corner markers */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-white/50 rounded-tl-lg" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-white/50 rounded-tr-lg" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-white/50 rounded-bl-lg" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-white/50 rounded-br-lg" />
        </div>

        {/* Rotating messages */}
        <div className="h-8 relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="text-white/70 text-lg font-light tracking-wide"
            >
              {MESSAGES[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Subtle loading dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white/30"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
