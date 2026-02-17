import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/database/db";
import GabaritoModel from "@/models/gabaritoModel";

type CreateGabaritoBody = {
  titulo: string;
  conteudogabarito: string;
};

type JwtPayload = {
  email: string;
  userId: string;
};

function verifyToken(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const secretKey = process.env.JWT_SECRET;

  if (!authHeader || !secretKey) return false;

  try {
    jwt.verify(authHeader, secretKey) as JwtPayload;
    return true;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    if (!verifyToken(request)) {
      return NextResponse.json(
        { mensagem: "Você pode não estar logado" },
        { status: 401 }
      );
    }

    const body: CreateGabaritoBody = await request.json();
    const { titulo, conteudogabarito } = body;

    const novoGabarito = new GabaritoModel({
      titulo,
      conteudogabarito,
    });

    await novoGabarito.save();

    return NextResponse.json(novoGabarito, { status: 201 });

  } catch (error: unknown) {
    return NextResponse.json(
      { mensagem: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
