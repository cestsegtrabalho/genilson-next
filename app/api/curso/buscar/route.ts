import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import Curso from "@/models/cursoModel";

export async function GET() {
  try {
    await connectDB();

    const cursos = await Curso.find();

    return NextResponse.json(cursos, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Erro interno";

    return NextResponse.json(
      { message: "Deu erro " + message },
      { status: 500 }
    );
  }
}
