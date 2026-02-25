// app/api/user/login/route.ts

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@/models/UserModel";
import connectDB from "@/database/db";

type LoginBody = {
  email: string;
  password: string;
};

type JwtPayload = {
  email: string;
  userId: string;
};

export async function POST(request: Request) {
  try {
    await connectDB();

    const body: LoginBody = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Email ou senha incorreto" },
        { status: 401 }
      );
    }

    let passwordIsValid = false;

    try {
      passwordIsValid = await bcrypt.compare(
      password,
      user.password as string
    );
    } catch (error) {
      return NextResponse.json(
        { error: 'Senha incorreta' },
        { status: 401 }
      );
    }

    if (!passwordIsValid) {
      return NextResponse.json(
        { message: "Senha inválida" },
        { status: 401 }
      );
    }

    const secretKey = process.env.JWT_SECRET as string;

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      } as JwtPayload,
      secretKey,
      { expiresIn: "10000h" }
    );

    return NextResponse.json({
      auth: true,
      id: user._id,
      name: user.name,
      username: user.username,
      phone: user.phone,
      token,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}

