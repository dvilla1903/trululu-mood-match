import Anthropic from '@anthropic-ai/sdk';
import { FLAVOR_IDS } from '@/lib/flavors';
import type { AnalysisResult } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 30;

const SYSTEM_PROMPT = `Eres el alma de Trululu, una marca de gomitas con vibe nostálgico-universitario. Analizas la expresión, energía y emoción general de una persona en una foto y le asignas UNO de estos 5 sabores de Trululu Aros según el mood que transmite:
- **sandia**: nervioso pero con buena energía, cálido, sociable
- **fresa**: tímido, dulce, reservado, sensible
- **uva**: misterioso, curioso, introspectivo, creativo
- **manzana-verde**: relajado, fresco, tranquilo, auténtico
- **naranja**: emocionado, extrovertido, energético, optimista

Devuelve SIEMPRE un JSON válido sin markdown, sin texto antes o después, con las claves: flavorId, detectedMood, personalMessage, energyLevel. El mensaje debe ser contemporáneo, emocional y dirigido al usuario en segunda persona ("tú"). No uses lenguaje infantil. Máximo 2 frases.`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key no configurada. Agrega ANTHROPIC_API_KEY en las variables de entorno.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { image, mediaType } = body as { image?: string; mediaType?: string };

    if (!image) {
      return NextResponse.json(
        { error: 'No se recibió ninguna imagen.' },
        { status: 400 }
      );
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!mediaType || !validTypes.includes(mediaType)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no soportado. Usa JPG, PNG o WebP.' },
        { status: 400 }
      );
    }

    // Check base64 size (~5MB limit)
    const sizeInBytes = (image.length * 3) / 4;
    if (sizeInBytes > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'La imagen es demasiado grande. Máximo 5MB.' },
        { status: 413 }
      );
    }

    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType as 'image/jpeg' | 'image/png' | 'image/webp',
                data: image,
              },
            },
            {
              type: 'text',
              text: 'Analiza mi expresión y asígname un sabor de Trululu Aros. Responde solo con el JSON.',
            },
          ],
        },
      ],
    });

    const textBlock = response.content.find((block) => block.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      return NextResponse.json(
        { error: 'No se pudo obtener respuesta del análisis.' },
        { status: 500 }
      );
    }

    let result: AnalysisResult;
    try {
      result = JSON.parse(textBlock.text);
    } catch {
      return NextResponse.json(
        { error: 'La respuesta del análisis no fue válida. Intenta de nuevo.' },
        { status: 500 }
      );
    }

    // Validate flavorId
    if (!FLAVOR_IDS.includes(result.flavorId)) {
      return NextResponse.json(
        { error: 'Sabor no reconocido. Intenta de nuevo.' },
        { status: 500 }
      );
    }

    // Clamp energyLevel
    result.energyLevel = Math.max(1, Math.min(10, Math.round(result.energyLevel)));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Analyze error:', error);
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json(
      { error: `Error al analizar la imagen: ${message}` },
      { status: 500 }
    );
  }
}
