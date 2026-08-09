import { Logo } from "./Logo";
import { OpenNotas } from "./OpenNotas";

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function Footer() {
  return (
    <footer id="contacto">
      <div className="wrap">
        <div className="fgrid">
          <div className="fbrand">
            <a href="#top" className="logo">
              <Logo />
            </a>
            <p>
              La plataforma del 6.º Primera Noche. Hecha por el curso, para el
              curso.
            </p>
            <div className="fsoc">
              <a href="#" aria-label="Instagram" title="Instagram">
                <svg {...svgProps}>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <path d="M17.5 6.5h.01" />
                </svg>
              </a>
              <a
                href="https://wa.me/595983263996"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <svg {...svgProps}>
                  <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.2-5.3A8.5 8.5 0 1 1 21 11.5Z" />
                </svg>
              </a>
              <a href="mailto:" aria-label="Correo" title="Correo">
                <svg {...svgProps}>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </a>
            </div>
          </div>

          <div className="fcol">
            <h5>Plataforma</h5>
            <a href="#materias">Materias</a>
            <a href="#horario">Horario</a>
            <a href="#biblioteca">Biblioteca</a>
            <a href="#documentos">Documentos</a>
          </div>

          <div className="fcol">
            <h5>Curso</h5>
            <OpenNotas>Notas y Trámites</OpenNotas>
            <a href="#documentos">Documentos</a>
            <a href="#biblioteca">Biblioteca</a>
            <a href="#contacto">Contacto</a>
          </div>

          <div className="fcol">
            <h5>Facultad</h5>
            <a href="#documentos">Reglamento FDyCS</a>
            <a href="#documentos">Calendario 2026</a>
            <a href="#">Campus EALU</a>
            <a href="#documentos">Constitución Nacional</a>
          </div>
        </div>

        <div className="fbot">
          <span>© 2026 · 6.º Primera Noche</span>
          <span>Desarrollado por Juan Manuel Britos — Delegado 2026</span>
        </div>
      </div>
    </footer>
  );
}
