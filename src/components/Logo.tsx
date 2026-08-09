// Logo JB (Juanma Britos · Delegado 2026) — vectorial, blanco, fondo transparente.
export function Logo() {
  return (
    <>
      <svg className="jb" viewBox="0 0 72 46" aria-hidden="true">
        <text x="0" y="39" className="jb-l">
          J
        </text>
        <text x="33" y="39" className="jb-l">
          B
        </text>
        <path className="jb-bolt" d="M38 3 L22 27 L31 27 L27 44 L48 20 L38 20 Z" />
      </svg>
      <span className="logotext">
        <b>JUANMA BRITOS</b>
        <small>DELEGADO 2026</small>
      </span>
    </>
  );
}
