import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import { isStoreConfigured, getContent } from "@/lib/content";
import { MATERIAS } from "@/data/materias";
import { DOCUMENTOS } from "@/data/documentos";
import { BIBLIOTECA, type Libro } from "@/data/biblioteca";
import { saveContentAction, logoutAction } from "./actions";
import { UploadField, FileUploader } from "@/components/admin/UploadField";

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
  const bibRows: Partial<Libro>[] = [
    ...(content.biblioteca ?? BIBLIOTECA),
    {},
    {},
    {},
  ];

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

      <div className="admin-card">
        <h2>Subir un archivo</h2>
        <p className="hint">
          Elegí un PDF o imagen de tu compu — se sube y te da un link para pegar
          en cualquier campo de abajo. (En Programa/Resumen/Libro también tenés
          el botón “Subir” directo.)
        </p>
        <FileUploader />
      </div>

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
                    <label>Programa</label>
                    <UploadField name={`prog__${i}`} defaultValue={l.programa ?? ""} placeholder="link o subí…" />
                  </div>
                  <div className="admin-field">
                    <label>Resumen</label>
                    <UploadField name={`res__${i}`} defaultValue={l.resumen ?? ""} placeholder="link o subí…" />
                  </div>
                  <div className="admin-field">
                    <label>Libro</label>
                    <UploadField name={`lib__${i}`} defaultValue={l.libro ?? ""} placeholder="link o subí…" />
                  </div>
                </div>
                <div className="admin-field">
                  <label>Más materiales (una línea: Etiqueta | link)</label>
                  <textarea name={`mas__${i}`} defaultValue={masText} placeholder="Apunte U3 | https://…" />
                </div>
                {m.grabaciones && (
                  <div className="admin-field">
                    <label>Grabaciones (link a la carpeta o playlist)</label>
                    <UploadField name={`grab__${i}`} defaultValue={l.grabaciones ?? ""} placeholder="link de Drive/YouTube o subí…" />
                  </div>
                )}
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
            Cargá cada libro con su <b>portada (miniatura)</b>. La imagen podés
            subirla directo (foto de la tapa) o pegar un link. Dejá un bloque
            vacío para no usarlo.
          </p>
          {bibRows.map((b, i) => (
            <div className="admin-mat" key={i}>
              <div className="admin-row">
                <div className="admin-field">
                  <label>Título</label>
                  <input name={`lib_tit__${i}`} defaultValue={b.titulo ?? ""} placeholder="Título del libro" />
                </div>
                <div className="admin-field">
                  <label>Materia</label>
                  <input name={`lib_mat__${i}`} defaultValue={b.materia ?? ""} placeholder="Materia" />
                </div>
                <div className="admin-field">
                  <label>Autor</label>
                  <input name={`lib_aut__${i}`} defaultValue={b.autor ?? ""} placeholder="Autor" />
                </div>
              </div>
              <div className="admin-row" style={{ gridTemplateColumns: "1fr 2fr" }}>
                <div className="admin-field">
                  <label>Estado</label>
                  <input name={`lib_est__${i}`} defaultValue={b.estado ?? ""} placeholder="PDF · 12 MB / Físico" />
                </div>
                <div className="admin-field">
                  <label>Link del libro (PDF)</label>
                  <UploadField name={`lib_url__${i}`} defaultValue={b.url ?? ""} placeholder="link o subí…" />
                </div>
              </div>
              <div className="admin-field">
                <label>Portada / miniatura</label>
                <UploadField name={`lib_por__${i}`} defaultValue={b.portada ?? ""} placeholder="subí una foto de la tapa o pegá el link de la imagen…" />
              </div>
            </div>
          ))}
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
