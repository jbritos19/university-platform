export type ContactoLink = {
  titulo: string;
  sub: string;
  href: string;
  icon: "whatsapp" | "users" | "info";
};

export const CONTACTOS: ContactoLink[] = [
  {
    titulo: "Escribime",
    sub: "Juan Manuel Britos — Delegado",
    href: "https://wa.me/595983263996",
    icon: "whatsapp",
  },
];
