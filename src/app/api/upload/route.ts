import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";

// Sube archivos directamente a Vercel Blob desde el navegador del delegado.
// Solo autoriza si hay sesión de admin válida.
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;
  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        if (!(await isAuthed())) throw new Error("No autorizado");
        return {
          allowedContentTypes: [
            "application/pdf",
            "image/jpeg",
            "image/png",
            "image/webp",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ],
          addRandomSuffix: true,
          maximumSizeInBytes: 25 * 1024 * 1024, // 25 MB
        };
      },
      onUploadCompleted: async () => {
        // Podríamos registrar la subida acá si hiciera falta.
      },
    });
    return NextResponse.json(json);
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 400 },
    );
  }
}
