import type { Tramite, Valores } from "@/data/tramites";

// ---- helpers ----
export function esc(s: unknown): string {
  return String(s ?? "").replace(
    /[&<>"]/g,
    (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[m] as string,
  );
}
// Valor escapado, o el placeholder resaltado si está vacío.
function ph(v: string | undefined, label: string): string {
  const val = (v ?? "").trim();
  return val ? esc(val) : `<span class="doc-ph">${esc(label)}</span>`;
}
function P(html: string): string {
  return `<p class="doc-p">${html}</p>`;
}
function toDecano(): string {
  return `<div class="doc-to">Señor<br>Prof. Dr. Carlos González Morel — Decano<br>Facultad de Derecho y Ciencias Sociales – Universidad Nacional de Asunción.<br><b>PRESENTE</b></div>`;
}
function toDacad(): string {
  return `<div class="doc-to">Señor<br>Prof. Dr. Carlos María Aquino — Director Académico<br>Facultad de Derecho y Ciencias Sociales – Universidad Nacional de Asunción.<br><b>PRESENTE</b></div>`;
}
function firma(v: Valores): string {
  return `<div class="doc-sign"><span class="l">${ph(v.nombre, "NOMBRE Y APELLIDO")}<br>C.I. N.º ${ph(v.ci, "C.I.")}</span></div>`;
}

// Combina los valores por defecto de los campos con lo cargado por el usuario.
export function getVals(t: Tramite, store: Valores): Valores {
  const d: Valores = {};
  for (const c of t.campos) if (c.def != null) d[c.id] = c.def;
  return { ...d, ...store };
}

// ---- plantillas (texto oficial de cada modelo) ----
type Plantilla = (v: Valores, t: Tramite) => string;

const PLANTILLAS: Record<string, Plantilla> = {
  justificativo(v) {
    const parcial = v.tipo !== "a clases";
    const evento = parcial
      ? `al primer examen parcial de ${ph(v.materia, "MATERIA")}`
      : `a las clases de ${ph(v.materia, "MATERIA")}`;
    const dicho = parcial ? "examen parcial" : "las clases";
    return (
      `<p class="doc-date">${ph(v.fecha, "FECHA")}</p>` +
      toDecano() +
      P(`Quien suscribe ${ph(v.nombre, "NOMBRE Y APELLIDO")} con C.I. N.º ${ph(v.ci, "C.I.")}, alumno del ${ph(v.semestre, "SEMESTRE")} semestre, ${ph(v.catedra, "CÁTEDRA")} cátedra del turno ${ph(v.turno, "TURNO")}, se dirige a usted y por su digno intermedio a quien corresponda, con el objeto de exponer y solicitar cuanto sigue:`) +
      P(`Que, conforme al art. 21 del Reglamento Interno, Régimen Académico de la Facultad de Derecho y Ciencias Sociales vigente, se establecen las normativas con referencia a las ausencias de alumnos en días de evaluaciones parciales.`) +
      P(`Que, por ${ph(v.motivo, "MOTIVO")} me ha sido imposible presentarme ${evento}, a cargo del/la profesor/a ${ph(v.docente, "DOCENTE")}, que se realizó en ${ph(v.fechaAusencia, "FECHA")} del presente año.`) +
      P(`<b>POR TANTO, SOLICITO</b> se tenga por justificada mi ausencia a ${dicho}, para tener derecho a rendir/recuperar en la próxima fecha a ser fijada.`) +
      P(`Sin otro particular y esperando una respuesta favorable, aprovecho la ocasión para saludarle muy atentamente.`) +
      firma(v)
    );
  },
  habilitacion(v) {
    return (
      `<p class="doc-date">${ph(v.fecha, "FECHA")}</p>` +
      `<div class="doc-to">Señor<br>Prof. Abg. Carlos María Aquino López — Director Académico<br>Facultad de Derecho y Ciencias Sociales – Universidad Nacional de Asunción.<br><b>PRESENTE</b></div>` +
      P(`El que suscribe, ${ph(v.nombre, "NOMBRE Y APELLIDO")} con C.I. N.º ${ph(v.ci, "C.I.")}, alumno del ${ph(v.semestre, "SEMESTRE")} semestre, ${ph(v.catedra, "CÁTEDRA")} cátedra del turno ${ph(v.turno, "TURNO")}, de esta prestigiosa casa de estudios, se dirige respetuosamente a Usted y por su digno intermedio a quien corresponda, a fin de exponer y solicitar cuanto sigue:`) +
      P(`QUE, cursando la asignatura ${ph(v.asignatura, "ASIGNATURA")} obtuve ${ph(v.puntaje, "PUNTAJE")} puntos de proceso; abierto el período de recuperación, el Prof. ${ph(v.docente, "DOCENTE")} no se presentó para dicho acto.`) +
      P(`Según el artículo 34 del Reglamento Académico: «Si el docente no asistiera a la clase recuperatoria y a petición por escrito del estudiante, la Dirección Académica lo habilitará con el puntaje mínimo de habilitación, treinta (30) puntos».`) +
      P(`Por lo que <b>SOLICITO</b> mi habilitación con el puntaje mínimo (30 puntos) en la materia ${ph(v.asignatura, "ASIGNATURA")}, cátedra a cargo del Prof. ${ph(v.docente, "DOCENTE")}, para tener la posibilidad de rendir en el primer, segundo o tercer llamado correspondiente.`) +
      P(`Sin otro particular y en espera de una respuesta favorable a mi petición, hago propicia la ocasión para saludarlo muy atentamente y desearle éxitos en su imperiosa labor.`) +
      firma(v)
    );
  },
  revision(v, t) {
    const tipo = t.meta?.tipoRevision || "EXAMEN PARCIAL";
    return (
      `<p class="doc-date">${ph(v.fecha, "FECHA")}</p>` +
      toDecano() +
      P(`Quien suscribe, ${ph(v.nombre, "NOMBRE Y APELLIDO")}, con C.I. N.º ${ph(v.ci, "C.I.")}, alumno del ${ph(v.semestre, "SEMESTRE")} semestre del turno ${ph(v.turno, "TURNO")}, me dirijo a usted y por su digno intermedio a quien corresponda:`) +
      P(`QUE, se presentaron a la Dirección Académica las calificaciones/asistencia del ${tipo} de la asignatura ${ph(v.asignatura, "ASIGNATURA")} (llevado a cabo el día ${ph(v.fechaEval, "FECHA")}), a cargo del Prof. ${ph(v.docente, "DOCENTE")}.`) +
      P(`Que, conforme al art. 47 del Reglamento Interno, Régimen Académico: «El estudiante podrá solicitar la revisión del examen parcial, mediante nota presentada ante la Dirección General Académica, dentro de un plazo no mayor a 48 (cuarenta y ocho) horas de la entrega de las planillas respectivas».`) +
      P(`Que, en vista al puntaje que se me consignó, pudiendo haber existido un posible error material en el momento de la asignación de la calificación, o en los criterios utilizados para la misma.`) +
      P(`<b>SOLICITO LA REVISIÓN</b> del ${tipo} mencionado.`) +
      P(`Aguardando una respuesta favorable a lo solicitado en la brevedad de tiempo posible, aprovecho la oportunidad para saludarlo con la más distinguida consideración.`) +
      firma(v)
    );
  },
  adjudicacion(v) {
    return (
      `<p class="doc-date">${ph(v.fecha, "FECHA")}</p>` +
      toDacad() +
      P(`Quien suscribe, ${ph(v.nombre, "NOMBRE Y APELLIDO")} con C.I. N.º ${ph(v.ci, "C.I.")}, alumno del ${ph(v.semestre, "SEMESTRE")} semestre, ${ph(v.catedra, "CÁTEDRA")} cátedra del turno ${ph(v.turno, "TURNO")}, de esta prestigiosa casa de estudios, se dirige respetuosamente a Usted a fin de exponer y solicitar cuanto sigue:`) +
      P(`Que, en fecha ${ph(v.fechaPublicacion, "FECHA")} se publicaron en el Sistema Informático de la Facultad los puntajes de habilitación en la asignatura ${ph(v.asignatura, "ASIGNATURA")}, cátedra a cargo del Prof. ${ph(v.docente, "DOCENTE")}.`) +
      P(`Que, presenté mi pedido de revisión de examen en fecha ${ph(v.fechaRevision, "FECHA")}, considerando que pudieron existir errores en la corrección y en la asignación del puntaje. Que, hasta la fecha, habiendo transcurrido más de 3 días hábiles, el catedrático no se ha expedido ni ha contestado la solicitud.`) +
      P(`Que, teniendo en cuenta los arts. 47, 50 y 52 del Reglamento —en particular el art. 52: «En caso de que el Docente no conteste la revisión de examen parcial conforme a este Reglamento, la Dirección General Académica, a pedido del estudiante, podrá otorgarle hasta el 50% del puntaje total asignado al examen si correspondiere».`) +
      P(`<b>POR LO TANTO, SOLICITO</b> se me otorguen, en virtud del art. 52, los puntos correspondientes en la asignatura ${ph(v.asignatura, "ASIGNATURA")}, quedando como sigue:`) +
      `<table class="doc-tab"><thead><tr><th>Primer Parcial</th><th>Segundo Parcial</th><th>Trabajo Práctico</th><th>Total</th></tr></thead><tbody><tr><td>${ph(v.pParcial, "—")}</td><td>${ph(v.sParcial, "—")}</td><td>${ph(v.tp, "—")}</td><td>${ph(v.total, "—")}</td></tr></tbody></table>` +
      P(`Sin otro particular y en espera de una respuesta favorable a mi petición, hago propicia la ocasión para saludarlo muy atentamente y desearle éxitos en su imperiosa labor.`) +
      firma(v)
    );
  },
  traslado(v) {
    return (
      `<p class="doc-date">${ph(v.fecha, "FECHA")}</p>` +
      toDacad() +
      P(`El que suscribe, ${ph(v.nombre, "NOMBRE Y APELLIDO")} con C.I. N.º ${ph(v.ci, "C.I.")}, alumno de la carrera de Derecho inscripto en el ${ph(v.semestre, "SEMESTRE")} semestre, turno ${ph(v.turnoActual, "TURNO ACTUAL")}, se dirige respetuosamente a usted con el fin de solicitar el traslado al turno ${ph(v.turnoDestino, "TURNO DESTINO")} en la ${ph(v.catedraDestino, "CÁTEDRA")} cátedra.`) +
      P(`El pedido obedece a ${ph(v.motivo, "MOTIVO")}.`) +
      P(`Esperando contar con una respuesta favorable en la brevedad posible, le saludo atentamente.`) +
      firma(v)
    );
  },
  renuncia(v) {
    return (
      `<p class="doc-date">${ph(v.fecha, "FECHA")}</p>` +
      toDacad() +
      P(`El que suscribe, ${ph(v.nombre, "NOMBRE Y APELLIDO")} con C.I. N.º ${ph(v.ci, "C.I.")}, alumno del ${ph(v.semestre, "SEMESTRE")} semestre, ${ph(v.catedra, "CÁTEDRA")} cátedra del turno ${ph(v.turno, "TURNO")}, de esta prestigiosa casa de estudios, se dirige a Usted a fin de exponer y solicitar cuanto sigue:`) +
      P(`QUE, teniendo en cuenta el acta N.º 17 (A.S. N.º 17/10/09/2014), Resolución N.º 0389-00-2014, que establece en su art. 38: «El estudiante que ha reprobado 3 (tres) veces la misma asignatura podrá peticionar, en nota debidamente justificada, la anulación del puntaje obtenido, a fin de cursarla y satisfacer nuevamente los requisitos exigidos».`) +
      P(`Que, poseo el puntaje mínimo de habilitación (30 puntos) en la asignatura ${ph(v.asignatura, "ASIGNATURA")}, cátedra a cargo del Prof. ${ph(v.docente, "DOCENTE")}, perteneciente al ${ph(v.semestre, "SEMESTRE")} semestre, ${ph(v.catedra, "CÁTEDRA")} cátedra, turno ${ph(v.turno, "TURNO")}.`) +
      P(`Por lo que <b>SOLICITO LA RENUNCIA</b> al puntaje mínimo de habilitación que obtuve en la asignatura mencionada.`) +
      P(`Sin otro particular y en espera de una respuesta favorable a mi petición, hago propicia la ocasión para saludarle muy atentamente y desearle éxitos en su imperiosa labor.`) +
      firma(v)
    );
  },
  reinscripcion(v) {
    return (
      `<p class="doc-date">${ph(v.fecha, "FECHA")}</p>` +
      toDecano() +
      P(`Quien suscribe, ${ph(v.nombre, "NOMBRE Y APELLIDO")} con C.I. N.º ${ph(v.ci, "C.I.")}, alumno de la carrera de Derecho, se dirige a usted y por su digno intermedio a quien corresponda al objeto de solicitar la reinscripción a la carrera.`) +
      P(`El pedido obedece a ${ph(v.motivo, "MOTIVO")}. Solicito la oportunidad de reinscripción al ${ph(v.semestreDestino, "SEMESTRE")} semestre, ${ph(v.catedra, "CÁTEDRA")} cátedra, del turno ${ph(v.turno, "TURNO")}.`) +
      P(`Sin otro particular me despido de usted cordialmente, deseándole éxitos en su gestión.`) +
      firma(v)
    );
  },
};

export function buildDoc(t: Tramite, store: Valores): string {
  const v = getVals(t, store);
  const fn = t.plantilla ? PLANTILLAS[t.plantilla] : undefined;
  const inner = fn
    ? fn(v, t)
    : `<p class="doc-empty">Este trámite todavía no tiene su modelo cargado.</p>`;
  return `<div class="doc">${inner}<div class="doc-foot">Documento generado desde la plataforma del curso · revisá los datos antes de presentarlo.</div></div>`;
}
