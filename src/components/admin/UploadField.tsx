"use client";

import { useState, type ChangeEvent } from "react";

const ACCEPT = ".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx";
const MAX = 4.4 * 1024 * 1024; // ~4.5 MB (límite de la plataforma)

async function subir(file: File): Promise<string> {
  if (file.size > MAX) {
    throw new Error(
      "El archivo supera los ~4,5 MB. Comprimí el PDF o pegá un link (Drive, etc.).",
    );
  }
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  const data = (await res.json()) as { url?: string; error?: string };
  if (!res.ok || !data.url) {
    throw new Error(data.error || "No se pudo subir el archivo.");
  }
  return data.url;
}

// Campo de link con botón "Subir": el delegado pega un link o sube un archivo.
export function UploadField({
  name,
  defaultValue,
  placeholder,
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [busy, setBusy] = useState(false);

  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      setUrl(await subir(file));
    } catch (err) {
      alert("No se pudo subir: " + (err as Error).message);
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  return (
    <div className="upfield">
      <input
        name={name}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder={placeholder}
      />
      <label className={`upbtn${busy ? " busy" : ""}`}>
        {busy ? "Subiendo…" : "Subir"}
        <input type="file" accept={ACCEPT} hidden onChange={onFile} />
      </label>
    </div>
  );
}

// Subidor general: elegís un archivo, se sube y copiás el link para pegarlo donde quieras.
export function FileUploader() {
  const [link, setLink] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setCopied(false);
    try {
      setLink(await subir(file));
    } catch (err) {
      alert("No se pudo subir: " + (err as Error).message);
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  function copy() {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="uploader">
      <label className={`upbtn${busy ? " busy" : ""}`}>
        {busy ? "Subiendo…" : "📎 Elegir archivo"}
        <input type="file" accept={ACCEPT} hidden onChange={onFile} />
      </label>
      {link && (
        <>
          <span className="u-link">{link}</span>
          <button type="button" className="upbtn" onClick={copy}>
            {copied ? "✓ Copiado" : "Copiar link"}
          </button>
        </>
      )}
    </div>
  );
}
