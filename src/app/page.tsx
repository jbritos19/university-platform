import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { QuickAccess } from "@/components/QuickAccess";
import { Materias } from "@/components/Materias";
import { Horario } from "@/components/Horario";
import { Documentos } from "@/components/Documentos";
import { Biblioteca } from "@/components/Biblioteca";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { NotasApp } from "@/components/notas/NotasApp";
import {
  getContent,
  isStoreConfigured,
  materiasView,
  documentosView,
  bibliotecaView,
} from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();
  const storeConfigured = isStoreConfigured();

  return (
    <>
      <span id="top" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <QuickAccess />
        <Materias items={materiasView(content)} storeConfigured={storeConfigured} />
        <Horario />
        <Documentos documentos={documentosView(content)} />
        <Biblioteca libros={bibliotecaView(content)} />
      </main>
      <Footer />
      <NotasApp />
      <ScrollReveal />
    </>
  );
}
