"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkPassword, startSession, endSession, isAuthed } from "@/lib/auth";
import { getContent, saveContent, type SiteContent, type MateriaLinks } from "@/lib/content";
import { MATERIAS } from "@/data/materias";
import type { Documento } from "@/data/documentos";
import type { Libro } from "@/data/biblioteca";

export async function loginAction(formData: FormData) {
  const pw = String(formData.get("password") ?? "");
  if (!checkPassword(pw)) redirect("/admin/login?error=1");
  await startSession();
  redirect("/admin");
}

export async function logoutAction() {
  await endSession();
  redirect("/admin/login");
}

function lines(v: FormDataEntryValue | null): string[] {
  return String(v ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}
function cols(line: string): string[] {
  return line.split("|").map((c) => c.trim());
}
function clean(s: string | undefined): string | undefined {
  const v = (s ?? "").trim();
  return v ? v : undefined;
}

export async function saveContentAction(formData: FormData) {
  if (!(await isAuthed())) redirect("/admin/login");

  const content: SiteContent = { ...(await getContent()) };

  // Materias (por posición)
  const materias: Record<string, MateriaLinks> = {};
  MATERIAS.forEach((m, i) => {
    const links: MateriaLinks = {
      programa: clean(String(formData.get(`prog__${i}`) ?? "")),
      resumen: clean(String(formData.get(`res__${i}`) ?? "")),
      libro: clean(String(formData.get(`lib__${i}`) ?? "")),
      grabaciones: clean(String(formData.get(`grab__${i}`) ?? "")),
      mas: lines(formData.get(`mas__${i}`))
        .map((l) => {
          const [label, url] = cols(l);
          return { label: label ?? "", url: url ?? "" };
        })
        .filter((x) => x.label && x.url),
    };
    if (!links.mas?.length) delete links.mas;
    if (links.programa || links.resumen || links.libro || links.grabaciones || links.mas)
      materias[m.n] = links;
  });
  content.materias = materias;

  // Documentos ("nombre | url")
  const docs: Documento[] = lines(formData.get("documentos")).map((l) => {
    const [nombre, url] = cols(l);
    return { nombre: nombre ?? "", url: clean(url) };
  });
  content.documentos = docs.length ? docs : undefined;

  // Biblioteca (bloques por libro, hasta 40)
  const GRADS = [
    "linear-gradient(150deg,#8B5CF6,#4c2f9e)",
    "linear-gradient(150deg,#3aa876,#1c5c3e)",
    "linear-gradient(150deg,#c77b18,#7a4a0d)",
    "linear-gradient(150deg,#4bb3c9,#245e6b)",
    "linear-gradient(150deg,#5b6bd6,#2f3a8a)",
    "linear-gradient(150deg,#d0518f,#7a2b53)",
  ];
  const libros: Libro[] = [];
  for (let i = 0; i < 40; i++) {
    const titulo = clean(String(formData.get(`lib_tit__${i}`) ?? ""));
    if (!titulo) continue;
    libros.push({
      titulo,
      materia: String(formData.get(`lib_mat__${i}`) ?? "").trim(),
      autor: String(formData.get(`lib_aut__${i}`) ?? "").trim(),
      estado: String(formData.get(`lib_est__${i}`) ?? "").trim() || "PDF",
      grad: GRADS[libros.length % GRADS.length],
      url: clean(String(formData.get(`lib_url__${i}`) ?? "")),
      portada: clean(String(formData.get(`lib_por__${i}`) ?? "")),
    });
  }
  content.biblioteca = libros.length ? libros : undefined;

  await saveContent(content);
  revalidatePath("/");
  redirect("/admin?saved=1");
}
