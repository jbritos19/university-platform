"use client";

import {
  BookOpen,
  CalendarDays,
  Library,
  FileText,
  NotebookPen,
  MessageCircle,
  Users,
  Info,
} from "lucide-react";
import { CONTACTOS } from "@/data/contacto";
import { openNotas } from "@/lib/notas";

const CONTACT_ICON = {
  whatsapp: MessageCircle,
  users: Users,
  info: Info,
} as const;

export function QuickAccess() {
  return (
    <section className="sec" id="accesos" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="sec-head center rv">
          <span className="kicker">Todo a un clic</span>
          <h2>Tu semestre, ordenado</h2>
          <p style={{ marginLeft: "auto", marginRight: "auto" }}>
            Los accesos que usás todos los días. Sin buscar, sin perderte.
          </p>
        </div>

        <div className="qgrid">
          <a href="#materias" className="qcard rv">
            <div className="ic">
              <BookOpen />
            </div>
            <h3>Materias</h3>
            <p>Programa, resumen, libro y más</p>
          </a>
          <a href="#horario" className="qcard rv">
            <div className="ic">
              <CalendarDays />
            </div>
            <h3>Horario</h3>
            <p>Tu semana de clases, de un vistazo</p>
          </a>
          <a href="#biblioteca" className="qcard rv">
            <div className="ic">
              <Library />
            </div>
            <h3>Biblioteca</h3>
            <p>Libros recomendados y digitales</p>
          </a>
          <button
            className="qcard rv"
            onClick={() => openNotas()}
            type="button"
          >
            <div className="ic">
              <NotebookPen />
            </div>
            <h3>Notas y Trámites</h3>
            <p>Generá tus notas y escritos oficiales</p>
          </button>
        </div>

        <div className="contact rv">
          <div className="contact-lead">
            <b>¿Dudas o consultas?</b>
            Escribime directo por WhatsApp cuando lo necesites.
          </div>
          <div className="contact-links">
            {CONTACTOS.map((c) => {
              const Icon = CONTACT_ICON[c.icon];
              return (
                <a
                  key={c.titulo}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clink"
                >
                  <span className="ci">
                    <Icon />
                  </span>
                  <span className="cx">
                    <b>{c.titulo}</b>
                    <span>{c.sub}</span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
