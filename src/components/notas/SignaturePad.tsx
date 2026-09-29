"use client";

import { useEffect, useRef, type PointerEvent, type ChangeEvent } from "react";

// Pad de firma: el usuario dibuja con el dedo/mouse, o sube una foto de su firma.
// Emite la imagen como dataURL (PNG) por onChange.
export function SignaturePad({
  value,
  onChange,
}: {
  value?: string;
  onChange: (dataUrl: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.lineWidth = 2.4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#15131f";
    if (value) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, c.width, c.height);
      img.src = value;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function point(e: PointerEvent) {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * (c.width / r.width),
      y: (e.clientY - r.top) * (c.height / r.height),
    };
  }
  function down(e: PointerEvent) {
    e.preventDefault();
    drawing.current = true;
    last.current = point(e);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  }
  function move(e: PointerEvent) {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const p = point(e);
    ctx.beginPath();
    ctx.moveTo(last.current!.x, last.current!.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
  }
  function up() {
    if (!drawing.current) return;
    drawing.current = false;
    onChange(canvasRef.current!.toDataURL("image/png"));
  }
  function clear() {
    const c = canvasRef.current!;
    c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
    onChange("");
  }
  function upload(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const c = canvasRef.current!;
        const ctx = c.getContext("2d")!;
        ctx.clearRect(0, 0, c.width, c.height);
        const scale = Math.min(c.width / img.width, c.height / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        ctx.drawImage(img, (c.width - w) / 2, (c.height - h) / 2, w, h);
        onChange(c.toDataURL("image/png"));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(f);
  }

  return (
    <div className="sigpad">
      <canvas
        ref={canvasRef}
        width={600}
        height={170}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerLeave={up}
      />
      <div className="sig-actions">
        <span className="sig-hint">Firmá acá con el dedo o el mouse</span>
        <div className="sig-btns">
          <label className="sig-btn">
            Subir foto
            <input type="file" accept="image/*" hidden onChange={upload} />
          </label>
          <button type="button" className="sig-btn" onClick={clear}>
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
}
