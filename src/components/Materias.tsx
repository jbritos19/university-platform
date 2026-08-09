"use client";

import { useEffect, useRef, useState } from "react";
import {
  FileText,
  NotebookPen,
  BookOpen,
  FolderOpen,
  ChevronDown,
  ArrowRight,
  Plus,
} from "lucide-react";
import { MATERIAS, type Materia } from "@/data/materias";

type TileDef = {
  key: keyof Materia["r"];
  label: string;
  Icon: typeof FileText;
};

const TILES: TileDef[] = [
  { key: "programa", label: "Programa", Icon: FileText },
  { key: "resumen", label: "Resumen", Icon: NotebookPen },
  { key: "libro", label: "Libro", Icon: BookOpen },
  { key: "mas", label: "Más materiales", Icon: FolderOpen },
];

function ResourceTile({ m, def }: { m: Materia; def: TileDef }) {
  const raw = m.r[def.key];
  const ready = def.key === "mas" ? (raw as number) > 0 : Boolean(raw);
  const state =
    def.key === "mas"
      ? ready
        ? `${raw} archivo${(raw as number) > 1 ? "s" : ""}`
        : "Sin cargar"
      : ready
        ? "Disponible"
        : "Pendiente";
  return (
    <button className={`restile ${ready ? "ready" : "empty"}`} type="button">
      <span className="ric">
        <def.Icon />
      </span>
      <span className="rx">
        <b>{def.label}</b>
        <span className="state">
          <span className="dt" />
          {state}
        </span>
      </span>
      <span className="go">{ready ? <ArrowRight /> : <Plus />}</span>
    </button>
  );
}

function MateriaRow({
  m,
  open,
  onToggle,
}: {
  m: Materia;
  open: boolean;
  onToggle: () => void;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);

  useEffect(() => {
    const measure = () => setH(innerRef.current?.offsetHeight ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const total =
    (m.r.programa ? 1 : 0) +
    (m.r.resumen ? 1 : 0) +
    (m.r.libro ? 1 : 0) +
    (m.r.mas > 0 ? m.r.mas : 0);

  return (
    <div className={`matrow${open ? " open" : ""}`}>
      <button className="mathead" onClick={onToggle} aria-expanded={open}>
        <span className="mdot" style={{ background: m.c }} />
        <span className="mname">
          {m.n} <em>· {m.p}</em>
        </span>
        <span className="mcount">
          {total ? `${total} recurso${total > 1 ? "s" : ""}` : "a completar"}
        </span>
        <ChevronDown className="chev" />
      </button>
      <div className="matbody" style={{ maxHeight: open ? h : 0 }}>
        <div className="resgrid" ref={innerRef}>
          {TILES.map((def) => (
            <ResourceTile key={def.key} m={m} def={def} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Materias() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="sec" id="materias">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="kicker">Académico</span>
          <h2>Tus materias, con todo adentro</h2>
          <p>
            Cada materia reúne su programa, su resumen, su libro y el material
            extra. Tocá una para abrirla — se van completando durante el
            semestre.
          </p>
        </div>
        <div className="matlist rv">
          {MATERIAS.map((m, i) => (
            <MateriaRow
              key={m.n}
              m={m}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
