// app/api/treino/buscar/route.ts

import { NextResponse } from "next/server";
import Treino from "@/models/treinoModel";
import connectDB from "@/database/db";

export async function GET() {
  try {
    await connectDB();

    const all = await Treino.find();

    return NextResponse.json(all, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Deu erro", error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Erro inesperado" },
      { status: 500 }
    );
  }
}
