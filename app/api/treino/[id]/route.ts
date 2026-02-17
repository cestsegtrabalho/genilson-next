// app/api/treino/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Treino from "@/models/treinoModel";
import connectDB from "@/database/db";

type RouteParams = {
  params: {
    id: string;
  };
};

type JwtPayload = {
  email: string;
  userId: string;
};

async function verifyToken(request: NextRequest): Promise<boolean> {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return false;
  }

  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    return false;
  }

  try {
    jwt.verify(authHeader, secretKey) as JwtPayload;
    return true;
  } catch {
    return false;
  }
}

/* ===================== PATCH ===================== */
export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectDB();

    const isValid = await verifyToken(request);

    if (!isValid) {
      return NextResponse.json(
        { mensagem: "Token inválido ou não fornecido" },
        { status: 401 }
      );
    }

    const { id } = params;
    const updates = await request.json();

    const treinoAtualizado = await Treino.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );

    if (!treinoAtualizado) {
      return NextResponse.json(
        { mensagem: "Treino não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(treinoAtualizado, { status: 200 });

  } catch (error: unknown) {
    return NextResponse.json(
      { mensagem: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

/* ===================== DELETE ===================== */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectDB();

    const isValid = await verifyToken(request);

    if (!isValid) {
      return NextResponse.json(
        { mensagem: "Token inválido ou não fornecido" },
        { status: 401 }
      );
    }

    const { id } = params;

    const treinoDeletado = await Treino.findByIdAndDelete(id);

    if (!treinoDeletado) {
      return NextResponse.json(
        { mensagem: "Treino não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Treino deletado com sucesso" },
      { status: 200 }
    );

  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
