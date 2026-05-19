'use client';

import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, ImagePlus, X } from 'lucide-react';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const MAX_SIZE = 5 * 1024 * 1024;
const VALID_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

interface UploadStepProps {
  onAnalyze: (base64: string, mediaType: string) => void;
}

export default function UploadStep({ onAnalyze }: UploadStepProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [base64Data, setBase64Data] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    setError(null);

    if (!VALID_TYPES.includes(file.type)) {
      setError('Solo se aceptan imágenes JPG, PNG o WebP.');
      return;
    }

    if (file.size > MAX_SIZE) {
      setError('La imagen es demasiado grande. Máximo 5MB.');
      return;
    }

    setMediaType(file.type);

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      // Extract base64 data without the data URL prefix
      const b64 = result.split(',')[1];
      setBase64Data(b64);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const clearImage = () => {
    setPreview(null);
    setBase64Data(null);
    setMediaType('');
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="flex flex-col items-center justify-center min-h-dvh px-6 py-12 relative"
    >
      {/* Background image */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'url(/bg-upload.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--background)]/60 to-[var(--background)]" />
      </div>

      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-8">
        {/* Header with floating gummies */}
        <div className="text-center space-y-3 relative">
          {/* Decorative floating gummies */}
          <motion.img
            src="/sandia.png"
            alt=""
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 0.7, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
            className="absolute -left-16 -top-8 w-14 h-14 object-contain blur-[1px] rotate-[-15deg] hidden md:block"
          />
          <motion.img
            src="/naranja.png"
            alt=""
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 0.7, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
            className="absolute -right-16 -top-4 w-12 h-12 object-contain blur-[1px] rotate-[20deg] hidden md:block"
          />
          <motion.img
            src="/uva.png"
            alt=""
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
            className="absolute -right-12 bottom-0 w-10 h-10 object-contain blur-[1px] rotate-[10deg] hidden md:block"
          />

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
            className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight"
          >
            Descubre qué Trululu eres hoy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
            className="text-lg text-gray-400 font-light"
          >
            Sube una foto tuya. Te leemos el mood.
          </motion.p>
        </div>

        {/* Upload area */}
        {!preview ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
            className={`upload-zone w-full aspect-square max-h-80 flex flex-col items-center justify-center gap-4 cursor-pointer ${
              isDragging ? 'drag-over' : ''
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="Subir imagen"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                inputRef.current?.click();
              }
            }}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
              <ImagePlus className="w-8 h-8 text-gray-400" />
            </div>
            <div className="text-center">
              <p className="text-white/70 text-sm">
                Arrastra tu foto aquí
              </p>
              <p className="text-white/40 text-xs mt-1">
                o haz clic para seleccionar
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white/60 text-xs">
              <Upload className="w-3.5 h-3.5" />
              JPG, PNG o WebP · Max 5MB
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="w-full relative"
          >
            <div className="glass-card overflow-hidden">
              <img
                src={preview}
                alt="Tu foto"
                className="w-full aspect-square object-cover rounded-3xl"
              />
            </div>
            <button
              onClick={clearImage}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-all"
              aria-label="Eliminar imagen"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Error */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm text-center"
          >
            {error}
          </motion.p>
        )}

        {/* CTA */}
        {preview && base64Data && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: EASE }}
            onClick={() => onAnalyze(base64Data, mediaType)}
            className="w-full max-w-xs py-4 px-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium text-lg hover:bg-white/15 hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            Analizar mi mood
          </motion.button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}
