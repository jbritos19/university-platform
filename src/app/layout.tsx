import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "6.º Primera Noche · Derecho UNA",
  description:
    "Plataforma del curso 6.º Primera Noche — Facultad de Derecho y Ciencias Sociales (UNA). Materias, horario, documentos, biblioteca y generador de notas y trámites.",
};

export const viewport: Viewport = {
  themeColor: "#09090B",
};

// Aplica el tema guardado antes del primer paint (evita el parpadeo).
const themeScript = `(function(){try{var m=localStorage.getItem("mode");if(m==="light")document.documentElement.setAttribute("data-mode","light")}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
