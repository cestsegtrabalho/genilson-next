import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import Curso from "@/models/cursoModel";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const { titulo, conteudo, nameUrl, linkUrl, urlvideo } = body;

    const novoCurso = await Curso.create({
      titulo,
      conteudo,
      nameUrl,
      linkUrl,
      urlvideo,
    });

    return NextResponse.json(novoCurso, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Erro interno";

    return NextResponse.json(
      { message: "Erro ao criar curso: " + message },
      { status: 500 }
    );
  }
}
