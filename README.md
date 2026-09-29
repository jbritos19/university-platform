⚖️ Plataforma del Curso — 6.º Primera Noche (Derecho UNA)
Aplicación web para el curso de 6.º semestre, turno noche de la Facultad de Derecho y Ciencias Sociales de la Universidad Nacional de Asunción (Paraguay). Centraliza materiales, horario, documentos y biblioteca, e incluye un generador de escritos y trámites oficiales con exportación a PDF, firma y adjuntos — más un panel de administración para que el delegado cargue todo sin tocar código.

🔗 Demo en vivo: https://6toprimeranochejm.vercel.app

Proyecto real, en producción y usado por el curso.

<!-- Agregá acá 2-3 capturas: la home, el generador de notas y el panel /admin --> <!-- ![Home](docs/home.png) -->
✨ Funcionalidades
Hub del curso — materias (con programa, resúmenes, bibliografía y grabaciones), horario semanal, documentos institucionales y biblioteca.
Generador de Notas y Trámites — motor config-driven que arma 10 escritos oficiales (justificativos, revisiones de examen, traslados, reinscripción…) con el texto legal correcto y los artículos del reglamento citados. Incluye:
Vista previa en vivo del documento mientras se completa el formulario.
Firma digital (dibujada en canvas o subida como imagen) embebida en la nota.
Adjuntos opcionales (cédula, constancia) que se suman al PDF.
Exportación a PDF lista para presentar.
Panel de administración (/admin) con login propio: el delegado edita materiales, sube archivos y publica cambios sin redeploy.
Tema claro/oscuro, diseño responsive y microinteracciones.
🛠️ Stack
Next.js 16 (App Router · Server Actions · Route Handlers) · React 19 · TypeScript · Tailwind CSS v4 · Vercel Blob (archivos) · Upstash Redis (contenido editable) · Framer Motion · lucide-react · deploy en Vercel.

🏗️ Decisiones de arquitectura
Trámites como configuración, no como código — cada nota es un objeto ({ campos, indicaciones, plantilla }); agregar un trámite nuevo no requiere UI nueva. El texto legal vive en plantillas puras y separadas. → src/data/tramites.ts, src/lib/doc.ts
Contenido editable sin deploy — el panel escribe en Redis y el sitio público lee overrides sobre datos por defecto tipados, con fallback seguro si el almacenamiento no está configurado. → src/lib/content.ts
Auth simple y segura — sesión por cookie firmada con HMAC (sin dependencias pesadas de auth). → src/lib/auth.ts
Subida de archivos vía route handler autorizada + Vercel Blob. → src/app/api/upload/route.ts
Firma — canvas → dataURL → embebido en el documento; PDF generado con CSS de impresión (sin librerías externas).
📁 Estructura
src/
├── app/
│   ├── page.tsx            # Home (server component; lee contenido)
│   ├── admin/              # Panel del delegado (login + editor + acciones)
│   └── api/upload/         # Subida de archivos (Vercel Blob)
├── components/             # UI (Hero, Materias, Horario, Notas y Trámites…)
├── data/                   # Datos tipados por defecto (materias, horario…)
└── lib/                    # doc.ts (plantillas), content.ts (Redis), auth.ts
🚀 Correr localmente
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
Variables de entorno (opcionales — sin ellas el sitio corre con datos por defecto y el panel queda en modo lectura):

ADMIN_PASSWORD=...            # contraseña del panel /admin
SESSION_SECRET=...            # secreto para firmar la sesión
KV_REST_API_URL=...           # Upstash Redis (contenido)
KV_REST_API_TOKEN=...
BLOB_READ_WRITE_TOKEN=...     # Vercel Blob (archivos), o vía OIDC en Vercel
📄 Licencia
MIT.
