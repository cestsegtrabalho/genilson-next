// app/api/prova/[nameUrl]/route.ts

import { NextResponse } from "next/server";
import Treino from "@/models/treinoModel";
import connectDB from "@/database/db";

type RouteParams = {
  params: {
    nameUrl: string;
  };
};

export async function GET(
  _request: Request,
  { params }: RouteParams
) {
  try {
    await connectDB();

    const { nameUrl } = params;

    const url = await Treino.findOne({ nameUrl });

    if (!url) {
      return NextResponse.json(
        { message: "nameUrl não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(url, { status: 200 });

  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Erro ao buscar nameUrl" },
      { status: 500 }
    );
  }
}
