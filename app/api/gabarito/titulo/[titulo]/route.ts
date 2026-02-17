import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import GabaritoModel from "@/models/gabaritoModel";

type RouteParams = {
  params: {
    titulo: string;
  };
};

export async function GET(
  _request: Request,
  { params }: RouteParams
) {
  try {
    await connectDB();

    const { titulo } = params;

    const gabarito = await GabaritoModel.findOne({ titulo });

    if (!gabarito) {
      return NextResponse.json(
        { message: "Gabarito não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(gabarito, { status: 200 });

  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Erro ao buscar gabarito" },
      { status: 500 }
    );
  }
}
