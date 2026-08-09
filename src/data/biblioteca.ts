export type Libro = {
  titulo: string;
  materia: string;
  autor: string;
  estado: string; // "PDF · 12 MB", "Físico", etc.
  grad: string; // gradiente CSS de la portada
  url?: string;
};

export const BIBLIOTECA: Libro[] = [
  {
    titulo: "Manual de Derecho Administrativo",
    materia: "Derecho Administrativo",
    autor: "Luis E. Chase Plate",
    estado: "PDF · 12 MB",
    grad: "linear-gradient(150deg,#8B5CF6,#4c2f9e)",
  },
  {
    titulo: "Derechos Humanos y Garantías",
    materia: "Derechos Humanos",
    autor: "Elodia Almirón",
    estado: "PDF · 9 MB",
    grad: "linear-gradient(150deg,#3aa876,#1c5c3e)",
  },
  {
    titulo: "Obligaciones · Tomo II",
    materia: "Obligaciones II",
    autor: "Bonifacio Ríos Ávalos",
    estado: "Físico",
    grad: "linear-gradient(150deg,#c77b18,#7a4a0d)",
  },
  {
    titulo: "Derecho de la Integración",
    materia: "D. de la Integración",
    autor: "Roberto Ruiz Díaz Labrano",
    estado: "PDF · 6 MB",
    grad: "linear-gradient(150deg,#4bb3c9,#245e6b)",
  },
];
