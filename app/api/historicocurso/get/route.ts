import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import HistoricoCurso from "@/models/historicoCurso";

export async function GET() {
  try {
    await connectDB();

    const historicosCurso = await HistoricoCurso.find();

    return NextResponse.json(historicosCurso, { status: 200 });

  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Erro interno ao buscar histórico cursos" },
      { status: 500 }
    );
  }
}
