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
import type { Materia } from "@/data/materias";
import type { MateriaLinks } from "@/lib/content";

type Item = { m: Materia; links: MateriaLinks };

const SINGLES = [
  { key: "programa", label: "Programa", Icon: FileText },
  { key: "resumen", label: "Resumen", Icon: NotebookPen },
  { key: "libro", label: "Libro", Icon: BookOpen },
] as const;

function Tile({
  label,
  Icon,
  ready,
  href,
  state,
}: {
  label: string;
  Icon: typeof FileText;
  ready: boolean;
  href?: string;
  state: string;
}) {
  const inner = (
    <>
      <span className="ric">
        <Icon />
      </span>
      <span className="rx">
        <b>{label}</b>
        <span className="state">
          <span className="dt" />
          {state}
        </span>
      </span>
      <span className="go">{ready ? <ArrowRight /> : <Plus />}</span>
    </>
  );
  if (ready && href) {
    return (
      <a className="restile ready" href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <button className={`restile ${ready ? "ready" : "empty"}`} type="button">
      {inner}
    </button>
  );
}

function MateriaRow({
  item,
  storeConfigured,
  open,
  onToggle,
}: {
  item: Item;
  storeConfigured: boolean;
  open: boolean;
  onToggle: () => void;
}) {
  const { m, links } = item;
  const innerRef = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);

  useEffect(() => {
    const measure = () => setH(innerRef.current?.offsetHeight ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const masCount = storeConfigured ? links.mas?.length ?? 0 : m.r.mas;
  const singleReady = (key: "programa" | "resumen" | "libro") =>
    storeConfigured ? !!links[key] : m.r[key];

  const total =
    (singleReady("programa") ? 1 : 0) +
    (singleReady("resumen") ? 1 : 0) +
    (singleReady("libro") ? 1 : 0) +
    (masCount > 0 ? masCount : 0);

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
          {SINGLES.map((s) => {
            const ready = singleReady(s.key);
            return (
              <Tile
                key={s.key}
                label={s.label}
                Icon={s.Icon}
                ready={ready}
                href={links[s.key]}
                state={ready ? "Disponible" : "Pendiente"}
              />
            );
          })}
          <Tile
            label="Más materiales"
            Icon={FolderOpen}
            ready={masCount > 0}
            href={links.mas?.[0]?.url}
            state={masCount > 0 ? `${masCount} archivo${masCount > 1 ? "s" : ""}` : "Sin cargar"}
          />
        </div>
      </div>
    </div>
  );
}

export function Materias({
  items,
  storeConfigured,
}: {
  items: Item[];
  storeConfigured: boolean;
}) {
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
          {items.map((item, i) => (
            <MateriaRow
              key={item.m.n}
              item={item}
              storeConfigured={storeConfigured}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
