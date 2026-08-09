import { BookOpen, ChevronDown } from "lucide-react";

// Estrellas con posiciones deterministas (sin Math.random → sin desajuste de hidratación).
const STARS = Array.from({ length: 44 }, (_, i) => ({
  left: (i * 97 + 13) % 100,
  top: (i * 57 + 29) % 62,
  delay: (i % 10) * 0.4,
}));

function Facade() {
  return (
    <svg
      className="facade"
      viewBox="0 0 1440 420"
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="stone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#151519" />
          <stop offset="1" stopColor="#0b0b0e" />
        </linearGradient>
        <linearGradient id="win" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8B5CF6" stopOpacity=".55" />
          <stop offset="1" stopColor="#8B5CF6" stopOpacity=".08" />
        </linearGradient>
      </defs>
      <path d="M560 150 720 70 880 150 Z" fill="url(#stone)" stroke="rgba(255,255,255,.06)" />
      <rect x="545" y="150" width="350" height="26" fill="url(#stone)" stroke="rgba(255,255,255,.05)" />
      <g fill="url(#stone)" stroke="rgba(255,255,255,.05)">
        <rect x="565" y="176" width="26" height="200" />
        <rect x="620" y="176" width="26" height="200" />
        <rect x="675" y="176" width="26" height="200" />
        <rect x="740" y="176" width="26" height="200" />
        <rect x="795" y="176" width="26" height="200" />
        <rect x="850" y="176" width="26" height="200" />
      </g>
      <rect x="530" y="376" width="380" height="44" fill="url(#stone)" />
      <rect x="180" y="230" width="350" height="190" fill="url(#stone)" stroke="rgba(255,255,255,.04)" />
      <rect x="910" y="230" width="350" height="190" fill="url(#stone)" stroke="rgba(255,255,255,.04)" />
      <g fill="url(#win)">
        <rect x="215" y="260" width="34" height="52" rx="3" />
        <rect x="275" y="260" width="34" height="52" rx="3" />
        <rect x="335" y="260" width="34" height="52" rx="3" />
        <rect x="395" y="260" width="34" height="52" rx="3" />
        <rect x="455" y="260" width="34" height="52" rx="3" />
        <rect x="955" y="260" width="34" height="52" rx="3" />
        <rect x="1015" y="260" width="34" height="52" rx="3" />
        <rect x="1075" y="260" width="34" height="52" rx="3" />
        <rect x="1135" y="260" width="34" height="52" rx="3" />
        <rect x="1195" y="260" width="34" height="52" rx="3" />
      </g>
      <rect x="695" y="300" width="50" height="76" rx="25" fill="url(#win)" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="hero">
      <div className="sky" />
      <div className="stars" aria-hidden="true">
        {STARS.map((s, i) => (
          <i
            key={i}
            style={{ left: `${s.left}%`, top: `${s.top}%`, animationDelay: `${s.delay}s` }}
          />
        ))}
      </div>
      <Facade />

      <div className="inner">
        <span className="badge rv">
          <span className="d" />
          Semestre 2026 · Turno Noche · en curso
        </span>
        <h1 className="rv">
          <span>Un curso.</span>
          <span>Una comunidad.</span>
          <span className="accent">Un mismo objetivo.</span>
        </h1>
        <p className="sub rv">
          Todo lo que necesitás durante el semestre, organizado en un solo lugar.
        </p>
        <div className="cta rv">
          <a href="#materias" className="btn primary">
            <BookOpen /> Explorar materias
          </a>
          <a href="#horario" className="btn ghost">
            Ver el horario
          </a>
        </div>
      </div>

      <a href="#accesos" className="scrolldn" aria-label="Bajar">
        <ChevronDown size={24} />
      </a>
    </section>
  );
}
