export type FlavorId = 'sandia' | 'fresa' | 'uva' | 'manzana-verde' | 'naranja';

export interface Flavor {
  id: FlavorId;
  name: string;
  emoji: string;
  image: string;
  gradient: string;
  accentColor: string;
  textColor: string;
  emotionalTraits: string[];
  baseDescription: string;
}

export const FLAVORS: Record<FlavorId, Flavor> = {
  sandia: {
    id: 'sandia',
    name: 'Sandía',
    emoji: '🍉',
    image: '/sandia.png',
    gradient: 'from-pink-400 via-red-400 to-green-400',
    accentColor: '#FF4D6D',
    textColor: '#FFFFFF',
    emotionalTraits: ['buena energía', 'nervioso pero positivo', 'cálido', 'sociable'],
    baseDescription: 'Aunque estés nervioso, sigues transmitiendo buena energía.',
  },
  fresa: {
    id: 'fresa',
    name: 'Fresa',
    emoji: '🍓',
    image: '/fresa.png',
    gradient: 'from-rose-300 via-pink-500 to-red-500',
    accentColor: '#E63946',
    textColor: '#FFFFFF',
    emotionalTraits: ['tímido', 'dulce', 'reservado', 'sensible'],
    baseDescription: 'Eres dulce por dentro, aunque a veces te cueste mostrarlo.',
  },
  uva: {
    id: 'uva',
    name: 'Uva',
    emoji: '🍇',
    image: '/uva.png',
    gradient: 'from-purple-400 via-violet-500 to-indigo-600',
    accentColor: '#7B2CBF',
    textColor: '#FFFFFF',
    emotionalTraits: ['misterioso', 'curioso', 'introspectivo', 'creativo'],
    baseDescription: 'Tu energía es profunda, observas el mundo distinto.',
  },
  'manzana-verde': {
    id: 'manzana-verde',
    name: 'Manzana Verde',
    emoji: '🍏',
    image: '/manzana-verde.png',
    gradient: 'from-lime-300 via-green-400 to-emerald-500',
    accentColor: '#52B788',
    textColor: '#0A2E1F',
    emotionalTraits: ['relajado', 'fresco', 'tranquilo', 'auténtico'],
    baseDescription: 'Transmites calma sin esfuerzo, tu vibe es pura.',
  },
  naranja: {
    id: 'naranja',
    name: 'Naranja',
    emoji: '🍊',
    image: '/naranja.png',
    gradient: 'from-yellow-300 via-orange-400 to-red-400',
    accentColor: '#FF8500',
    textColor: '#FFFFFF',
    emotionalTraits: ['emocionado', 'energético', 'extrovertido', 'optimista'],
    baseDescription: 'Tu emoción se siente a kilómetros, contagias energía.',
  },
};

export const FLAVOR_IDS: FlavorId[] = ['sandia', 'fresa', 'uva', 'manzana-verde', 'naranja'];
