// Disparador desacoplado del módulo "Notas y Trámites".
// Cualquier componente puede pedir abrirlo sin conocer su implementación.
export const NOTAS_EVENT = "notas:open";

export function openNotas(id?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(NOTAS_EVENT, { detail: id ?? null }));
}
