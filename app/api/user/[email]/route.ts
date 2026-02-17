// app/api/user/[email]/route.ts

import { NextResponse } from "next/server";
import User from "@/models/UserModel";
import db from "@/database/db"

type RouteParams = {
  params: {
    email: string;
  };
};

export async function GET(
  _request: Request,
  { params }: RouteParams
) {
  try {
    await db();

    const email = params.email;

    if (!email) {
      return NextResponse.json(
        { message: "E-mail não fornecido" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Login feito com sucesso",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Erro no servidor ao fazer login" },
      { status: 500 }
    );
  }
}
