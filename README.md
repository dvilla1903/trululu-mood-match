# Trululu Mood Match

Sube una foto tuya y descubre que sabor de Trululu Aros eres hoy. La app analiza tu expresion emocional con IA y te asigna uno de 5 sabores con un mensaje personalizado.

**Stack:** Next.js 14+ (App Router) + TypeScript + Tailwind CSS + Framer Motion + Claude API (Vision)

## Setup local

```bash
npm install
cp .env.local.example .env.local
# Agrega tu ANTHROPIC_API_KEY en .env.local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Deploy

1. Push a GitHub.
2. Importar el repo en [vercel.com/new](https://vercel.com/new).
3. Agregar variable de entorno: `ANTHROPIC_API_KEY`.
4. Deploy.

## Sabores

| Sabor | Mood |
|-------|------|
| Sandia | Nervioso pero con buena energia, calido, sociable |
| Fresa | Timido, dulce, reservado, sensible |
| Uva | Misterioso, curioso, introspectivo, creativo |
| Manzana Verde | Relajado, fresco, tranquilo, autentico |
| Naranja | Emocionado, extrovertido, energetico, optimista |
