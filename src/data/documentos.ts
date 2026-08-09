export type Documento = {
  nombre: string;
  url?: string; // enlace de descarga (cargar cuando esté disponible)
};

export const DOCUMENTOS: Documento[] = [
  { nombre: "Reglamento Académico FDyCS" },
  { nombre: "Calendario Académico 2026" },
  { nombre: "Estatuto CEDUNA" },
  { nombre: "Constitución Nacional" },
  { nombre: "Código Civil" },
  { nombre: "Código Penal" },
];
