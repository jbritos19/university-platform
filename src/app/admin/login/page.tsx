import { loginAction } from "../actions";
import { adminConfigured } from "@/lib/auth";
import { Logo } from "@/components/Logo";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  const configured = adminConfigured();

  return (
    <div className="admin admin-login">
      <div className="logo-wrap">
        <a href="/" className="logo">
          <Logo />
        </a>
      </div>
      <div className="admin-card">
        <h2>Panel del Delegado</h2>
        <p className="hint">Ingresá con tu contraseña para cargar contenido.</p>

        {!configured && (
          <div className="admin-note warn">
            Falta configurar la variable <b>ADMIN_PASSWORD</b> en Vercel.
          </div>
        )}
        {sp?.error && (
          <div className="admin-note err">Contraseña incorrecta.</div>
        )}

        <form action={loginAction}>
          <div className="admin-field">
            <label>Contraseña</label>
            <input type="password" name="password" autoFocus required />
          </div>
          <button
            className="btn primary"
            type="submit"
            style={{ width: "100%", justifyContent: "center" }}
          >
            Entrar
          </button>
        </form>
      </div>
      <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "var(--ink-3)" }}>
        <a href="/">← Volver al sitio</a>
      </p>
    </div>
  );
}
