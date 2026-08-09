export type RecursosEstado = {
  programa: boolean;
  resumen: boolean;
  libro: boolean;
  mas: number;
};

export type Materia = {
  n: string; // nombre
  p: string; // profesor(es)
  c: string; // color
  r: RecursosEstado;
};

// Estado de recursos por materia. Cambiá false → true (o mas: N) a medida
// que se van cargando los materiales.
export const MATERIAS: Materia[] = [
  {
    n: "Obligaciones II",
    p: "Dr. Bonifacio Ríos Ávalos · Dr. Alberto Martínez Simón",
    c: "#c77b18",
    r: { programa: true, resumen: false, libro: true, mas: 0 },
  },
  {
    n: "Derecho Administrativo",
    p: "Dr. Luis E. Chase Plate · Dr. Javier Parquet Villagra",
    c: "#8B5CF6",
    r: { programa: true, resumen: true, libro: true, mas: 2 },
  },
  {
    n: "Derechos Humanos",
    p: "Dra. Elodia Almirón",
    c: "#3aa876",
    r: { programa: false, resumen: false, libro: false, mas: 0 },
  },
  {
    n: "Derecho Político",
    p: "Dr. Jorge Saguier · Dra. Anaya Arrúa",
    c: "#5b6bd6",
    r: { programa: true, resumen: false, libro: false, mas: 0 },
  },
  {
    n: "Derecho de la Integración",
    p: "Dr. Roberto Ruiz Díaz Labrano · Dr. Guillermo Irigoitia",
    c: "#4bb3c9",
    r: { programa: false, resumen: false, libro: false, mas: 0 },
  },
];
