// app/api/treino/criar/route.ts

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Treino from "@/models/treinoModel";
import connectDB from "@/database/db";

type CreateTreinoBody = {
  treino1: string;
  treino2: string;
  treino3: string;
  treino4: string;
  treino5: string;
  userid: string;
  storeid: string;
  nameUrl: string;
  nameProva: string;
  linkUrl: string;
};

type JwtPayload = {
  email: string;
  userId: string;
};

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { message: "Token não fornecido" },
        { status: 401 }
      );
    }

    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      return NextResponse.json(
        { message: "Chave secreta não configurada" },
        { status: 500 }
      );
    }

    try {
      jwt.verify(authHeader, secretKey) as JwtPayload;
    } catch {
      return NextResponse.json(
        { message: "Token inválido" },
        { status: 401 }
      );
    }

    const body: CreateTreinoBody = await request.json();

    const {
      treino1,
      treino2,
      treino3,
      treino4,
      treino5,
      userid,
      storeid,
      nameUrl,
      nameProva,
      linkUrl,
    } = body;

    const novoTreino = new Treino({
      treino1,
      treino2,
      treino3,
      treino4,
      treino5,
      userid,
      storeid,
      nameUrl,
      nameProva,
      linkUrl,
    });

    await novoTreino.save();

    return NextResponse.json(novoTreino, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { mensagem: "Você pode não estar logado", error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { mensagem: "Erro inesperado" },
      { status: 500 }
    );
  }
}
