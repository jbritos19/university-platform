"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { Search, Bell, Moon, Sun } from "lucide-react";
import { Logo } from "./Logo";
import { openNotas } from "@/lib/notas";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mode, setMode] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Refleja el tema aplicado por el script inline (y lo re-aplica tras el remount de dev).
  useLayoutEffect(() => {
    const saved = localStorage.getItem("mode");
    if (saved === "light")
      document.documentElement.setAttribute("data-mode", "light");
    setMode(
      document.documentElement.getAttribute("data-mode") === "light"
        ? "light"
        : "dark",
    );
  }, []);

  function toggleMode() {
    const next = mode === "light" ? "dark" : "light";
    if (next === "light")
      document.documentElement.setAttribute("data-mode", "light");
    else document.documentElement.removeAttribute("data-mode");
    localStorage.setItem("mode", next);
    setMode(next);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <nav className={scrolled ? "scrolled" : undefined}>
      <div className="navin">
        <button
          className="logo"
          onClick={scrollToTop}
          aria-label="Inicio — Juanma Britos, Delegado 2026"
        >
          <Logo />
        </button>

        <div className="nlinks">
          <a href="#top">Inicio</a>
          <a href="#materias">Materias</a>
          <a href="#horario">Horario</a>
          <a href="#biblioteca">Biblioteca</a>
          <a href="#documentos">Documentos</a>
          <button onClick={() => openNotas()}>Notas</button>
          <a href="#contacto">Contacto</a>
        </div>

        <div className="ntools">
          <button
            className="icobtn"
            title="Buscar materias"
            onClick={() =>
              document
                .getElementById("materias")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            aria-label="Buscar"
          >
            <Search />
          </button>
          <button className="icobtn bell" title="Notificaciones" aria-label="Notificaciones">
            <Bell />
          </button>
          <button
            className="icobtn themebtn"
            title="Modo claro / oscuro"
            onClick={toggleMode}
            aria-label="Cambiar tema"
          >
            {mode === "light" ? <Moon /> : <Sun />}
          </button>
        </div>
      </div>
    </nav>
  );
}
