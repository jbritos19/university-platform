"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  FileText,
  ArrowRight,
  ArrowLeft,
  X,
  Eye,
  Download,
  Plus,
} from "lucide-react";
import { TRAMITES, type Tramite, type Campo, type Valores } from "@/data/tramites";
import { buildDoc, getVals } from "@/lib/doc";
import { NOTAS_EVENT } from "@/lib/notas";

const CATEGORIAS = ["Todos", "Académico", "Administrativo"] as const;

export function NotasApp() {
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [cat, setCat] = useState<string>("Todos");
  const [values, setValues] = useState<Record<string, Valores>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const current = currentId ? TRAMITES.find((t) => t.id === currentId) ?? null : null;

  const hasData = useCallback(
    (id: string | null) => {
      if (!id) return false;
      const v = values[id];
      return !!v && Object.values(v).some((x) => String(x).trim() !== "");
    },
    [values],
  );

  const close = useCallback(() => {
    if (current && hasData(current.id)) {
      if (
        !window.confirm(
          "Tenés datos cargados en este formulario. Se conservarán para cuando vuelvas. ¿Cerrar igual?",
        )
      )
        return;
    }
    setOpen(false);
    setModalOpen(false);
    setCurrentId(null);
  }, [current, hasData]);

  const volver = useCallback(() => {
    if (current && hasData(current.id)) {
      if (
        !window.confirm(
          "Tus datos quedarán guardados para cuando vuelvas a este trámite. ¿Volver a la lista?",
        )
      )
        return;
    }
    setCurrentId(null);
  }, [current, hasData]);

  // Escucha el disparador global.
  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string | null>).detail;
      setOpen(true);
      setCurrentId(id ?? null);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener(NOTAS_EVENT, handler);
    return () => window.removeEventListener(NOTAS_EVENT, handler);
  }, []);

  // Bloqueo de scroll del body cuando el overlay está abierto.
  useEffect(() => {
    document.body.classList.toggle("nt-lock", open);
    return () => document.body.classList.remove("nt-lock");
  }, [open]);

  // Teclado.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (modalOpen) setModalOpen(false);
      else if (open) {
        if (current) volver();
        else close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, modalOpen, current, volver, close]);

  function setField(campoId: string, val: string) {
    if (!current) return;
    setValues((prev) => ({
      ...prev,
      [current.id]: { ...(prev[current.id] ?? {}), [campoId]: val },
    }));
  }

  function generarPdf() {
    if (!current || !printRef.current) return;
    printRef.current.innerHTML = buildDoc(current, values[current.id] ?? {});
    setTimeout(() => window.print(), 60);
  }

  const filtered = TRAMITES.filter(
    (t) => cat === "Todos" || t.categoria === cat,
  );

  const vals = current ? getVals(current, values[current.id] ?? {}) : {};

  return (
    <>
      <div className={`nt-app${open ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="Notas y Trámites">
        <div className="nt-top">
          <div className="nt-top-in">
            {current ? (
              <>
                <button className="nt-back" onClick={volver}>
                  <ArrowLeft /> Volver
                </button>
                <span className="nt-title">{current.titulo}</span>
              </>
            ) : (
              <span className="nt-title">Notas y Trámites</span>
            )}
            <button className="nt-close" onClick={close} aria-label="Cerrar">
              <X />
            </button>
          </div>
        </div>

        <div className="nt-body">
          {!current ? (
            /* ---------- LISTA ---------- */
            <div className="nt-view">
              <div className="nt-lead">
                <span className="kicker">Módulo</span>
                <h1>Notas y Trámites</h1>
                <p>
                  Seleccioná el tipo de nota o trámite que necesitás para
                  completar el formulario correspondiente.
                </p>
              </div>
              <div className="nt-filters">
                {CATEGORIAS.map((c) => (
                  <button
                    key={c}
                    className={`nt-filter${cat === c ? " on" : ""}`}
                    onClick={() => setCat(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="nt-grid">
                {filtered.map((t) => (
                  <button
                    key={t.id}
                    className="nt-card"
                    onClick={() => setCurrentId(t.id)}
                  >
                    <div className="ic">
                      <FileText />
                    </div>
                    <div className="cat">{t.categoria}</div>
                    <h3>{t.titulo}</h3>
                    <div className="d">{t.descripcion}</div>
                    <span className="open">
                      Abrir formulario <ArrowRight />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* ---------- DETALLE ---------- */
            <div className="nt-view" key={current.id}>
              <div className="nt-dethead">
                <span className="nt-cat">{current.categoria}</span>
                <h1>{current.titulo}</h1>
              </div>
              <div className="nt-hr" />

              <div className="nt-sec nt-indic">
                <div className="sh">📌 Indicaciones</div>
                {current.indicaciones.length ? (
                  <ul>
                    {current.indicaciones.map((i, idx) => (
                      <li key={idx}>{i}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="nt-note">
                    Las indicaciones de este trámite se cargarán cuando se
                    incorpore el modelo oficial. La estructura ya está lista para
                    recibirlas.
                  </div>
                )}
              </div>

              <div className="nt-hr" />

              <div className="nt-sec">
                <div className="sh">📝 Formulario</div>
                {current.campos.length ? (
                  <div className="nt-form-grid">
                    {current.campos.map((c) => (
                      <Field
                        key={c.id}
                        campo={c}
                        value={vals[c.id] ?? ""}
                        visible={c.showIf ? c.showIf(vals) : true}
                        onChange={(val) => setField(c.id, val)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="nt-note">
                    Este formulario está listo para configurarse. Cuando se
                    incorpore el modelo de la nota, sus campos aparecerán aquí
                    automáticamente.
                  </div>
                )}
              </div>

              <div className="nt-actions">
                <button
                  className="btn ghost"
                  disabled={!current.campos.length}
                  onClick={() => setModalOpen(true)}
                >
                  <Eye /> Vista previa
                </button>
                <button
                  className="btn primary"
                  disabled={!current.campos.length}
                  onClick={generarPdf}
                >
                  <Download /> Generar PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de vista previa */}
      <div className={`nt-modal${modalOpen ? " open" : ""}`}>
        <div className="nt-modal-in">
          <div className="nt-modal-top">
            <b>Vista previa del documento</b>
            <button className="nt-x" onClick={() => setModalOpen(false)} aria-label="Cerrar">
              ✕
            </button>
          </div>
          <div
            className="nt-modal-body"
            dangerouslySetInnerHTML={{
              __html:
                modalOpen && current
                  ? buildDoc(current, values[current.id] ?? {})
                  : "",
            }}
          />
          <div className="nt-modal-act">
            <button className="btn ghost" onClick={() => setModalOpen(false)}>
              Cerrar
            </button>
            <button className="btn primary" onClick={generarPdf}>
              Generar PDF
            </button>
          </div>
        </div>
      </div>

      {/* Contenedor de impresión (oculto salvo al imprimir) */}
      <div id="nt-print" ref={printRef} />
    </>
  );
}

function Field({
  campo,
  value,
  visible,
  onChange,
}: {
  campo: Campo;
  value: string;
  visible: boolean;
  onChange: (v: string) => void;
}) {
  if (!visible) return null;
  const req = campo.required ? <span className="req">*</span> : null;
  const full = campo.full || campo.tipo === "textarea";

  let control: React.ReactNode;
  if (campo.tipo === "textarea") {
    control = (
      <textarea
        value={value}
        placeholder={campo.placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  } else if (campo.tipo === "select") {
    control = (
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Seleccionar…</option>
        {(campo.opciones ?? []).map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  } else if (campo.tipo === "file") {
    control = (
      <label className="nt-file">
        📎 Seleccionar archivo (PDF, JPG o PNG)
        <input
          type="file"
          accept={campo.accept ?? ".pdf,.jpg,.jpeg,.png"}
          onChange={(e) => onChange(e.target.files?.[0]?.name ?? "")}
        />
      </label>
    );
  } else {
    control = (
      <input
        type={campo.tipo === "date" ? "date" : campo.tipo}
        value={value}
        placeholder={campo.placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  return (
    <div className={`nt-field${full ? " full" : ""}`}>
      <label>
        {campo.label} {req}
      </label>
      {control}
      {campo.help && <span className="nt-help">{campo.help}</span>}
    </div>
  );
}
