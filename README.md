# 6.º Primera Noche · Derecho UNA

Plataforma del curso **6.º Primera Noche** — Facultad de Derecho y Ciencias Sociales (UNA).
Desarrollada por **Juan Manuel Britos — Delegado 2026**.

Stack: **Next.js 16 · React 19 · TypeScript · Tailwind v4 · Framer Motion · lucide-react**.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
```

## Dónde se edita el contenido

Los datos están separados de la interfaz, en `src/data/`:

| Archivo | Qué contiene |
|---|---|
| `materias.ts` | Materias, profesores y estado de recursos (programa/resumen/libro/más) |
| `horario.ts` | Horario semanal y leyenda de colores |
| `documentos.ts` | Documentos importantes (con su enlace de descarga) |
| `biblioteca.ts` | Libros recomendados |
| `contacto.ts` | Enlaces de WhatsApp |
| `tramites.ts` | Config de los trámites (campos, indicaciones, plantillas) |

El texto de cada nota vive en `src/lib/doc.ts`.

## Deploy

```bash
npx vercel          # primer deploy (preview)
npx vercel --prod   # producción
```

Subdominio previsto: `6toprimeranochejm.vercel.app`.
