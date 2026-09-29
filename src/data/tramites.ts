export type CampoTipo =
  | "text"
  | "textarea"
  | "date"
  | "select"
  | "file"
  | "number"
  | "email";

export type Valores = Record<string, string>;

export type Campo = {
  id: string;
  label: string;
  tipo: CampoTipo;
  required?: boolean;
  placeholder?: string;
  opciones?: string[];
  accept?: string;
  full?: boolean;
  def?: string;
  help?: string;
  showIf?: (v: Valores) => boolean;
};

export type Tramite = {
  id: string;
  categoria: "Académico" | "Administrativo";
  titulo: string;
  descripcion: string;
  indicaciones: string[];
  campos: Campo[];
  plantilla?: string; // clave en el registro de plantillas
  meta?: Record<string, string>;
};

// Indicaciones según destinatario (tomadas del documento oficial).
function decanoIndic(x?: string): string[] {
  return (x ? [x] : []).concat([
    "Dirigido al Decano, Prof. Dr. Bonifacio Ríos Ávalos.",
    "Se presenta por Mesa de Entrada (en físico) o al correo mesadeentrada@der.una.py.",
    "Adjuntá foto de tu cédula de identidad (ambos lados).",
  ]);
}
function dacadIndic(x?: string): string[] {
  return (x ? [x] : []).concat([
    "Dirigido al Director Académico, Prof. Dr. Ariel Martínez.",
    "Se envía al correo dacad@der.una.py.",
    "Adjuntá foto de tu cédula de identidad (ambos lados).",
  ]);
}

// Los 4 tipos de revisión comparten los mismos campos.
function revisionCampos(): Campo[] {
  return [
    { id: "fecha", label: "Fecha de la nota", tipo: "text", placeholder: "Ej. 30 de junio de 2026" },
    { id: "nombre", label: "Nombre y apellido", tipo: "text", required: true },
    { id: "ci", label: "C.I. N.º", tipo: "text", required: true },
    { id: "semestre", label: "Semestre", tipo: "text", def: "6.º" },
    { id: "turno", label: "Turno", tipo: "text", def: "Noche" },
    { id: "asignatura", label: "Asignatura", tipo: "text" },
    { id: "fechaEval", label: "Fecha de la evaluación", tipo: "text", placeholder: "Ej. 19 de junio" },
    { id: "docente", label: "Profesor/a", tipo: "text" },
  ];
}

export const TRAMITES: Tramite[] = [
  {
    id: "justificativo-ausencia",
    categoria: "Académico",
    titulo: "Justificativo de ausencia a clases o a parcial",
    descripcion: "Justificás una ausencia a clases o a un examen parcial (art. 21).",
    plantilla: "justificativo",
    indicaciones: decanoIndic("Aplica al art. 21 del Reglamento (ausencias en días de evaluación)."),
    campos: [
      { id: "fecha", label: "Fecha de la nota", tipo: "text", placeholder: "Ej. 30 de junio de 2026" },
      { id: "nombre", label: "Nombre y apellido", tipo: "text", required: true },
      { id: "ci", label: "C.I. N.º", tipo: "text", required: true, placeholder: "Ej. 4.567.890" },
      { id: "semestre", label: "Semestre", tipo: "text", def: "6.º" },
      { id: "catedra", label: "Cátedra", tipo: "text", def: "1.ª" },
      { id: "turno", label: "Turno", tipo: "text", def: "Noche" },
      { id: "tipo", label: "Tipo de ausencia", tipo: "select", def: "a un examen parcial", opciones: ["a un examen parcial", "a clases"] },
      { id: "materia", label: "Materia", tipo: "text" },
      { id: "docente", label: "Profesor/a", tipo: "text" },
      { id: "fechaAusencia", label: "Fecha de la ausencia / examen", tipo: "text", placeholder: "Ej. 12 de junio" },
      { id: "motivo", label: "Motivo", tipo: "textarea", full: true, placeholder: "Ej. razones de salud, laborales…" },
    ],
  },
  {
    id: "habilitacion-oficio",
    categoria: "Administrativo",
    titulo: "Nota de habilitación por oficio",
    descripcion: "El docente no se presentó al recuperatorio: se habilita con 30 puntos (art. 34).",
    plantilla: "habilitacion",
    indicaciones: dacadIndic("Aplica cuando el docente no asiste al recuperatorio (art. 34)."),
    campos: [
      { id: "fecha", label: "Fecha de la nota", tipo: "text", placeholder: "Ej. 25 de junio de 2026" },
      { id: "nombre", label: "Nombre y apellido", tipo: "text", required: true },
      { id: "ci", label: "C.I. N.º", tipo: "text", required: true },
      { id: "semestre", label: "Semestre", tipo: "text", def: "6.º" },
      { id: "catedra", label: "Cátedra", tipo: "text", def: "1.ª" },
      { id: "turno", label: "Turno", tipo: "text", def: "Noche" },
      { id: "asignatura", label: "Asignatura", tipo: "text" },
      { id: "docente", label: "Profesor/a", tipo: "text" },
      { id: "puntaje", label: "Puntos de proceso obtenidos", tipo: "text", placeholder: "Ej. 29" },
    ],
  },
  {
    id: "revision-final",
    categoria: "Académico",
    titulo: "Revisión de examen final",
    descripcion: "Pedís revisión de un examen final (art. 47).",
    plantilla: "revision",
    meta: { tipoRevision: "EXAMEN FINAL" },
    indicaciones: decanoIndic("Plazo: hasta 48 horas de la entrega de las planillas (art. 47)."),
    campos: revisionCampos(),
  },
  {
    id: "revision-parcial",
    categoria: "Académico",
    titulo: "Revisión de examen parcial",
    descripcion: "Pedís revisión de un examen parcial (art. 47).",
    plantilla: "revision",
    meta: { tipoRevision: "EXAMEN PARCIAL" },
    indicaciones: decanoIndic("Plazo: hasta 48 horas de la entrega de las planillas (art. 47)."),
    campos: revisionCampos(),
  },
  {
    id: "revision-asistencia",
    categoria: "Académico",
    titulo: "Revisión de asistencia",
    descripcion: "Pedís revisión de la asistencia registrada.",
    plantilla: "revision",
    meta: { tipoRevision: "CONTROL DE ASISTENCIA" },
    indicaciones: decanoIndic("Plazo: hasta 48 horas de la entrega de las planillas (art. 47)."),
    campos: revisionCampos(),
  },
  {
    id: "revision-proceso",
    categoria: "Académico",
    titulo: "Revisión de proceso",
    descripcion: "Pedís revisión del proceso de la materia.",
    plantilla: "revision",
    meta: { tipoRevision: "PROCESO" },
    indicaciones: decanoIndic("Plazo: hasta 48 horas de la entrega de las planillas (art. 47)."),
    campos: revisionCampos(),
  },
  {
    id: "adjudicacion",
    categoria: "Académico",
    titulo: "Adjudicación de puntos o asistencia",
    descripcion: "El docente no contestó la revisión: se otorga hasta el 50% del puntaje (art. 52).",
    plantilla: "adjudicacion",
    indicaciones: dacadIndic("Aplica cuando el docente no contesta la revisión en plazo (art. 52)."),
    campos: [
      { id: "fecha", label: "Fecha de la nota", tipo: "text", placeholder: "Ej. 01 de julio de 2026" },
      { id: "nombre", label: "Nombre y apellido", tipo: "text", required: true },
      { id: "ci", label: "C.I. N.º", tipo: "text", required: true },
      { id: "semestre", label: "Semestre", tipo: "text", def: "6.º" },
      { id: "catedra", label: "Cátedra", tipo: "text", def: "1.ª" },
      { id: "turno", label: "Turno", tipo: "text", def: "Noche" },
      { id: "asignatura", label: "Asignatura", tipo: "text" },
      { id: "docente", label: "Profesor/a", tipo: "text" },
      { id: "fechaPublicacion", label: "Fecha de publicación de puntajes", tipo: "text", placeholder: "Ej. 19 de junio" },
      { id: "fechaRevision", label: "Fecha del pedido de revisión", tipo: "text", placeholder: "Ej. 23 de junio" },
      { id: "pParcial", label: "Primer parcial", tipo: "text" },
      { id: "sParcial", label: "Segundo parcial", tipo: "text" },
      { id: "tp", label: "Trabajo práctico", tipo: "text" },
      { id: "total", label: "Total", tipo: "text" },
    ],
  },
  {
    id: "traslado-turno",
    categoria: "Administrativo",
    titulo: "Traslado de turno",
    descripcion: "Solicitás el traslado a otro turno y cátedra.",
    plantilla: "traslado",
    indicaciones: dacadIndic("Si el traslado es al turno noche, debés adjuntar certificado laboral."),
    campos: [
      { id: "fecha", label: "Fecha de la nota", tipo: "text", placeholder: "Ej. 28 de agosto de 2026" },
      { id: "nombre", label: "Nombre y apellido", tipo: "text", required: true },
      { id: "ci", label: "C.I. N.º", tipo: "text", required: true },
      { id: "semestre", label: "Semestre", tipo: "text", def: "6.º" },
      { id: "turnoActual", label: "Turno actual", tipo: "text", placeholder: "Ej. Tarde" },
      { id: "turnoDestino", label: "Turno al que te trasladás", tipo: "select", def: "Noche", opciones: ["Noche", "Tarde", "Mañana"] },
      { id: "catedraDestino", label: "Cátedra de destino", tipo: "text", def: "1.ª" },
      { id: "motivo", label: "Motivo", tipo: "textarea", full: true, placeholder: "Ej. motivos laborales…" },
      {
        id: "certificado",
        label: "Certificado laboral",
        tipo: "file",
        full: true,
        accept: ".pdf,.jpg,.jpeg,.png",
        help: "Obligatorio solo si te trasladás al turno noche.",
        showIf: (v) => (v.turnoDestino || "") === "Noche",
      },
    ],
  },
  {
    id: "reinscripcion",
    categoria: "Administrativo",
    titulo: "Reinscripción",
    descripcion: "Solicitás la reinscripción a la carrera.",
    plantilla: "reinscripcion",
    indicaciones: decanoIndic(),
    campos: [
      { id: "fecha", label: "Fecha de la nota", tipo: "text", placeholder: "Ej. 14 de marzo de 2026" },
      { id: "nombre", label: "Nombre y apellido", tipo: "text", required: true },
      { id: "ci", label: "C.I. N.º", tipo: "text", required: true },
      { id: "semestreDestino", label: "Semestre al que te reinscribís", tipo: "text", placeholder: "Ej. 6.º" },
      { id: "catedra", label: "Cátedra", tipo: "text", def: "1.ª" },
      { id: "turno", label: "Turno", tipo: "text", def: "Noche" },
      { id: "motivo", label: "Motivo", tipo: "textarea", full: true, placeholder: "Ej. motivos particulares / laborales…" },
    ],
  },
  {
    id: "renuncia-proceso",
    categoria: "Académico",
    titulo: "Renuncia de proceso",
    descripcion: "Renunciás al puntaje mínimo de habilitación de una materia (art. 38).",
    plantilla: "renuncia",
    indicaciones: dacadIndic("Aplica tras reprobar 3 veces la misma asignatura (art. 38)."),
    campos: [
      { id: "fecha", label: "Fecha de la nota", tipo: "text", placeholder: "Ej. 10 de marzo de 2026" },
      { id: "nombre", label: "Nombre y apellido", tipo: "text", required: true },
      { id: "ci", label: "C.I. N.º", tipo: "text", required: true },
      { id: "semestre", label: "Semestre", tipo: "text", def: "6.º" },
      { id: "catedra", label: "Cátedra", tipo: "text", def: "1.ª" },
      { id: "turno", label: "Turno", tipo: "text", def: "Noche" },
      { id: "asignatura", label: "Asignatura", tipo: "text" },
      { id: "docente", label: "Profesor/a", tipo: "text" },
    ],
  },
  {
    id: "exoneracion-promedio",
    categoria: "Académico",
    titulo: "Exoneración por promedio",
    descripcion: "Solicitud de exoneración por promedio.",
    indicaciones: [],
    campos: [],
  },
];
