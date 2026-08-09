"use client";

import type { ReactNode } from "react";
import { openNotas } from "@/lib/notas";

export function OpenNotas({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button type="button" className={className} onClick={() => openNotas(id)}>
      {children}
    </button>
  );
}
