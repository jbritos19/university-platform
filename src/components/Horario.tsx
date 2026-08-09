import type { CSSProperties } from "react";
import { HORARIO, LEYENDA } from "@/data/horario";

// Permite pasar la variable CSS --c en el estilo inline.
function cvar(color: string): CSSProperties {
  return { ["--c" as string]: color } as CSSProperties;
}

export function Horario() {
  return (
    <section className="sec" id="horario" style={{ background: "var(--bg-soft)" }}>
      <div className="wrap">
        <div className="sec-head rv">
          <span className="kicker">Organización</span>
          <h2>Tu semana de clases</h2>
          <p>
            Turno noche, de lunes a viernes — 17:50 a 22:00. La clase en curso se
            resalta sola.
          </p>
        </div>

        <div className="weekwrap rv">
          <div className="week">
            {HORARIO.map((d) => (
              <div key={d.dia} className={`hday${d.hoy ? " today" : ""}`}>
                <div className="hday-h">
                  {d.dia}
                  {d.hoy && <span className="badge-h">Hoy</span>}
                </div>
                {d.slots.map((s, i) => (
                  <div
                    key={i}
                    className={`hslot${s.now ? " now" : ""}`}
                    style={cvar(s.c)}
                  >
                    <div className="ht">{s.t}</div>
                    <div className="hs">
                      <i />
                      {s.s}
                      {s.now && <span className="live-h">En curso</span>}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="hlegend rv">
          {LEYENDA.map((l) => (
            <span key={l.n}>
              <i style={{ background: l.c }} />
              {l.n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
