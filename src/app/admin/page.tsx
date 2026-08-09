import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import { isStoreConfigured, getContent } from "@/lib/content";
import { MATERIAS } from "@/data/materias";
import { DOCUMENTOS } from "@/data/documentos";
import { BIBLIOTECA } from "@/data/biblioteca";
import { saveContentAction, logoutAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  if (!(await isAuthed())) redirect("/admin/login");
  const sp = await searchParams;
  const content = await getContent();
  const storeOk = isStoreConfigured();

  const docsPrefill = (content.documentos ?? DOCUMENTOS)
    .map((d) => `${d.nombre}${d.url ? ` | ${d.url}` : ""}`)
    .join("\n");
  const bibPrefill = (content.biblioteca ?? BIBLIOTECA)
    .map((b) => `${b.titulo} | ${b.materia} | ${b.autor} | ${b.estado}${b.url ? ` | ${b.url}` : ""}`)
    .join("\n");

  return (
    <div className="admin">
      <div className="admin-top">
        <div>
          <h1>Panel del Delegado</h1>
          <p className="sub">
            Cargá y editá el contenido del curso. Los cambios se publican al
            guardar.
          </p>
        </div>
        <form action={logoutAction}>
          <button className="btn ghost" type="submit">
            Salir
          </button>
        </form>
      </div>

      {!storeOk && (
        <div className="admin-note warn">
          ⚠️ La base de datos todavía no está conectada. Podés ver el panel, pero{" "}
          <b>guardar no funcionará</b> hasta conectar el almacenamiento (KV) en
          Vercel.
        </div>
      )}
      {sp?.saved && (
        <div className="admin-note ok">✓ Cambios guardados y publicados.</div>
      )}

      <form action={saveContentAction}>
        <div className="admin-card">
          <h2>Materias</h2>
          <p className="hint">
            Pegá el link (Google Drive, PDF, etc.) de cada recurso. Dejá vacío lo
            que no tengas. En “Más materiales”, una línea por archivo con el
            formato <b>Etiqueta | link</b>.
          </p>
          {MATERIAS.map((m, i) => {
            const l = content.materias?.[m.n] ?? {};
            const masText = (l.mas ?? [])
              .map((x) => `${x.label} | ${x.url}`)
              .join("\n");
            return (
              <div className="admin-mat" key={m.n}>
                <div className="mt">
                  <i style={{ background: m.c }} />
                  {m.n}
                </div>
                <div className="admin-row">
                  <div className="admin-field">
                    <label>Programa (link)</label>
                    <input name={`prog__${i}`} defaultValue={l.programa ?? ""} placeholder="https://…" />
                  </div>
                  <div className="admin-field">
                    <label>Resumen (link)</label>
                    <input name={`res__${i}`} defaultValue={l.resumen ?? ""} placeholder="https://…" />
                  </div>
                  <div className="admin-field">
                    <label>Libro (link)</label>
                    <input name={`lib__${i}`} defaultValue={l.libro ?? ""} placeholder="https://…" />
                  </div>
                </div>
                <div className="admin-field">
                  <label>Más materiales (una línea: Etiqueta | link)</label>
                  <textarea name={`mas__${i}`} defaultValue={masText} placeholder="Apunte U3 | https://…" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="admin-card">
          <h2>Documentos importantes</h2>
          <p className="hint">
            Una línea por documento: <b>Nombre | link</b>. El link es opcional.
          </p>
          <div className="admin-field">
            <textarea name="documentos" defaultValue={docsPrefill} style={{ minHeight: 140 }} />
          </div>
        </div>

        <div className="admin-card">
          <h2>Biblioteca</h2>
          <p className="hint">
            Una línea por libro: <b>Título | Materia | Autor | Estado | link</b>.
            Ej: <i>Manual de Administrativo | Derecho Administrativo | Chase Plate | PDF · 12 MB | https://…</i>
          </p>
          <div className="admin-field">
            <textarea name="biblioteca" defaultValue={bibPrefill} style={{ minHeight: 140 }} />
          </div>
        </div>

        <div className="admin-actions">
          <button className="btn primary" type="submit" disabled={!storeOk}>
            Guardar y publicar
          </button>
          <a href="/" className="btn ghost" target="_blank" rel="noopener">
            Ver el sitio ↗
          </a>
        </div>
      </form>
    </div>
  );
}
