import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import HistoricoProva from "@/models/historicoProva";

/* ===================== READ ===================== */
export async function GET() {
  try {
    await connectDB();

    const historicosProva = await HistoricoProva.find();

    return NextResponse.json(historicosProva, { status: 200 });

  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Erro interno ao buscar histórico de provas" },
      { status: 500 }
    );
  }
}