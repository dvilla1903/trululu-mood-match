import type { FlavorId } from './flavors';

export interface AnalysisResult {
  flavorId: FlavorId;
  detectedMood: string;
  personalMessage: string;
  energyLevel: number;
}

export type AppStep = 'upload' | 'analyzing' | 'result' | 'closing';
