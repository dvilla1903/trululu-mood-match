'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { AppStep, AnalysisResult } from '@/lib/types';
import UploadStep from '@/components/UploadStep';
import AnalyzingStep from '@/components/AnalyzingStep';
import ResultStep from '@/components/ResultStep';
import ClosingStep from '@/components/ClosingStep';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Home() {
  const [step, setStep] = useState<AppStep>('upload');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async (base64: string, mediaType: string) => {
    setImagePreview(`data:${mediaType};base64,${base64}`);
    setStep('analyzing');
    setError(null);

    try {
      const [response] = await Promise.all([
        fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64, mediaType }),
        }),
        sleep(3000),
      ]);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error al analizar la imagen.');
      }

      const data: AnalysisResult = await response.json();
      setResult(data);
      setStep('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido.');
      setStep('upload');
    }
  }, []);

  const handleRestart = useCallback(() => {
    setStep('upload');
    setImagePreview('');
    setResult(null);
    setError(null);
  }, []);

  return (
    <main className="animated-bg flex-1 relative">
      {error && step === 'upload' && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-300 text-sm max-w-sm text-center">
          {error}
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 'upload' && (
          <UploadStep key="upload" onAnalyze={handleAnalyze} />
        )}

        {step === 'analyzing' && (
          <AnalyzingStep key="analyzing" imagePreview={imagePreview} />
        )}

        {step === 'result' && result && (
          <ResultStep
            key="result"
            result={result}
            onContinue={() => setStep('closing')}
          />
        )}

        {step === 'closing' && result && (
          <ClosingStep
            key="closing"
            flavorId={result.flavorId}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
