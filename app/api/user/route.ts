// app/api/user/route.ts

import { NextResponse } from "next/server";
import User from "@/models/UserModel"; // ajuste o caminho se necessário

export async function GET() {
  try {
    const all = await User.find();

    return NextResponse.json(
      {
        message: "Todos os usuários",
        data: all,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {error: "Erro ao buscar usuários"},
      { status: 500 }
    );
  }
}
