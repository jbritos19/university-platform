import type { Libro } from "@/data/biblioteca";

export function Biblioteca({ libros }: { libros: Libro[] }) {
  return (
    <section
      className="sec"
      id="biblioteca"
      style={{ background: "var(--bg-soft)" }}
    >
      <div className="wrap">
        <div className="sec-head rv">
          <span className="kicker">Biblioteca</span>
          <h2>Los libros del semestre</h2>
          <p>
            Recomendados por las cátedras. Con vista previa y descarga cuando
            estén disponibles.
          </p>
        </div>

        <div className="bgrid">
          {libros.map((b) => (
            <a
              key={b.titulo}
              className="book rv"
              href={b.url ?? "#"}
              {...(b.url ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <div className="cov" style={{ background: b.grad }}>
                <span className="t">{b.titulo}</span>
              </div>
              <h4>{b.materia}</h4>
              <div className="au">{b.autor}</div>
              <div className="get">
                <span className="st">{b.estado}</span>
                <span className="go">Ver</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
