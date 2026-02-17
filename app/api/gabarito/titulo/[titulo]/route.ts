import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import GabaritoModel from "@/models/gabaritoModel";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ titulo: string }> }
) {
  try {
    await connectDB();

    const { titulo } = await context.params;

    const gabarito = await GabaritoModel.findOne({ titulo });

    if (!gabarito) {
      return NextResponse.json(
        { message: "Gabarito não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(gabarito, { status: 200 });

  } catch {
    return NextResponse.json(
      { message: "Erro ao buscar gabarito" },
      { status: 500 }
    );
  }
}
