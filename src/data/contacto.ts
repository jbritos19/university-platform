export type ContactoLink = {
  titulo: string;
  sub: string;
  href: string;
  icon: "whatsapp" | "users" | "info";
};

export const CONTACTOS: ContactoLink[] = [
  {
    titulo: "Escribime",
    sub: "Juan Manuel Britos",
    href: "https://wa.me/595983263996",
    icon: "whatsapp",
  },
  {
    titulo: "Grupo general",
    sub: "Chat del curso",
    href: "https://chat.whatsapp.com/EAWA5reWNHDCuZoTFgBdwv",
    icon: "users",
  },
  {
    titulo: "Informaciones",
    sub: "Solo avisos",
    href: "https://chat.whatsapp.com/Lbszexj4laS9UQqVGY7O8z",
    icon: "info",
  },
];
