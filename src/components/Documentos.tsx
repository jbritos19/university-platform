import { BookMarked, Download } from "lucide-react";
import type { Documento } from "@/data/documentos";
import { OpenNotas } from "./OpenNotas";

export function Documentos({ documentos }: { documentos: Documento[] }) {
  return (
    <section className="sec" id="documentos">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="kicker">Gestión</span>
          <h2>Documentos importantes</h2>
          <p>
            Los códigos y la normativa que siempre buscás a último momento. Todo
            en un solo lugar. ¿Necesitás generar una nota? Está en{" "}
            <OpenNotas className="doc-notas-link">Notas y Trámites</OpenNotas>.
          </p>
        </div>

        <div className="tramgrid rv">
          <div className="tramcard" style={{ maxWidth: 620, margin: "0 auto" }}>
            <div className="tramhead">
              <div className="ic">
                <BookMarked />
              </div>
              <div>
                <h3>Documentos importantes</h3>
                <p>Normativa y códigos, siempre a mano</p>
              </div>
            </div>
            <div className="tramlist">
              {documentos.map((doc) => (
                <a
                  key={doc.nombre}
                  className="tramitem"
                  href={doc.url ?? "#"}
                  {...(doc.url
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className="dot" />
                  <span className="tx">
                    <b>{doc.nombre}</b>
                  </span>
                  <span className="go">
                    <Download />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
