// app/api/user/[email]/route.ts

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserModel";
import db from "@/database/db";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
  try {
    await db();

    const { username } = await context.params;

    if (!username) {
      return NextResponse.json(
        { message: "E-mail não fornecido" },
        { status: 400 }
      );
    }

    // Find user and exclude sensitive fields
    const user = await User.findOne({ username }).select(
      "_id name username email phone"
    );

    if (!user) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Return only necessary fields (flat structure)
    return NextResponse.json(
      {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return NextResponse.json(
      { message: "Erro no servidor ao fazer login" },
      { status: 500 }
    );
  }
}
