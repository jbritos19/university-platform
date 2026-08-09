export type Slot = {
  t: string; // franja horaria
  s: string; // materia
  c: string; // color
  now?: boolean; // clase en curso (demo)
};

export type Dia = {
  dia: string;
  hoy?: boolean;
  slots: Slot[];
};

export const HORARIO: Dia[] = [
  {
    dia: "Lunes",
    slots: [{ t: "17:50 – 22:00", s: "Derechos Humanos", c: "#3aa876" }],
  },
  {
    dia: "Martes",
    slots: [
      { t: "17:50 – 19:50", s: "Derecho Político", c: "#5b6bd6" },
      { t: "20:00 – 22:00", s: "Obligaciones II", c: "#c77b18" },
    ],
  },
  {
    dia: "Miércoles",
    slots: [
      { t: "17:50 – 19:50", s: "Derecho Administrativo", c: "#8B5CF6" },
      { t: "20:00 – 22:00", s: "Derecho de la Integración", c: "#4bb3c9" },
    ],
  },
  {
    dia: "Jueves",
    hoy: true,
    slots: [
      { t: "17:50 – 19:50", s: "Derecho Político", c: "#5b6bd6", now: true },
      { t: "20:00 – 22:00", s: "Derecho Administrativo", c: "#8B5CF6" },
    ],
  },
  {
    dia: "Viernes",
    slots: [
      { t: "17:50 – 21:00", s: "Obligaciones II", c: "#c77b18" },
      { t: "21:00 – 22:00", s: "Derecho de la Integración", c: "#4bb3c9" },
    ],
  },
];

export const LEYENDA: { n: string; c: string }[] = [
  { n: "Obligaciones II", c: "#c77b18" },
  { n: "Derecho Administrativo", c: "#8B5CF6" },
  { n: "Derechos Humanos", c: "#3aa876" },
  { n: "Derecho Político", c: "#5b6bd6" },
  { n: "Derecho de la Integración", c: "#4bb3c9" },
];
