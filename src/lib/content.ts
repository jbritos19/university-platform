import { Redis } from "@upstash/redis";
import { MATERIAS, type Materia } from "@/data/materias";
import { DOCUMENTOS, type Documento } from "@/data/documentos";
import { BIBLIOTECA, type Libro } from "@/data/biblioteca";

// ---- modelo editable (lo que el delegado carga desde el panel) ----
export type MateriaLinks = {
  programa?: string;
  resumen?: string;
  libro?: string;
  mas?: { label: string; url: string }[];
};

export type SiteContent = {
  materias?: Record<string, MateriaLinks>; // clave = nombre de la materia
  documentos?: Documento[];
  biblioteca?: Libro[];
};

// ---- conexión a Upstash (KV). Si no está configurada, todo cae a los defaults. ----
let cached: Redis | null | undefined;
function getRedis(): Redis | null {
  if (cached !== undefined) return cached;
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  cached = url && token ? new Redis({ url, token }) : null;
  return cached;
}

export function isStoreConfigured(): boolean {
  return getRedis() !== null;
}

const KEY = "content:v1";

export async function getContent(): Promise<SiteContent> {
  const r = getRedis();
  if (!r) return {};
  try {
    return (await r.get<SiteContent>(KEY)) ?? {};
  } catch {
    return {};
  }
}

export async function saveContent(c: SiteContent): Promise<void> {
  const r = getRedis();
  if (!r) throw new Error("El almacenamiento no está configurado.");
  await r.set(KEY, c);
}

// ---- vistas efectivas para el sitio público ----
export type MateriaView = { m: Materia; links: MateriaLinks };

export function materiasView(content: SiteContent): MateriaView[] {
  return MATERIAS.map((m) => ({ m, links: content.materias?.[m.n] ?? {} }));
}

export function documentosView(content: SiteContent): Documento[] {
  return content.documentos && content.documentos.length
    ? content.documentos
    : DOCUMENTOS;
}

export function bibliotecaView(content: SiteContent): Libro[] {
  return content.biblioteca && content.biblioteca.length
    ? content.biblioteca
    : BIBLIOTECA;
}
