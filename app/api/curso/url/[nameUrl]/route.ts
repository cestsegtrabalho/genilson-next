import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import Curso from "@/models/cursoModel";

interface Params {
  params: {
    nameUrl: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    await connectDB();

    const curso = await Curso.findOne({ nameUrl: params.nameUrl });

    if (!curso) {
      return NextResponse.json(
        { message: "nameUrl não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(curso, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Erro ao buscar nameUrl";

    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}
