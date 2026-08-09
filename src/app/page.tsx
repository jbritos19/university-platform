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

export default function Home() {
  return (
    <>
      <span id="top" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <QuickAccess />
        <Materias />
        <Horario />
        <Documentos />
        <Biblioteca />
      </main>
      <Footer />
      <NotasApp />
      <ScrollReveal />
    </>
  );
}
