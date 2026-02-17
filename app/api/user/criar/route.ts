// app/api/user/criar/route.ts

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/UserModel";
import connectDB from "@/database/db";

type CreateUserBody = {
  name: string;
  phone: string;
  email: string;
  password: string;
  username: string;
};

export async function POST(request: Request) {
  try {
    await connectDB();

    const body: CreateUserBody = await request.json();
    const { name, phone, email, password, username } = body;

    if (!name || !phone || !email || !password || !username) {
      return NextResponse.json(
        { message: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json(
          { message: "Email já existe" },
          { status: 400 }
        );
      }

      if (existingUser.username === username) {
        return NextResponse.json(
          { message: "Username já existe" },
          { status: 400 }
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      phone,
      email,
      password: hashedPassword,
      username,
    });

    const savedUser = await newUser.save();

    const { _id } = savedUser;

    return NextResponse.json(
      {
        message: "Usuário registrado com sucesso",
        user: {
          _id,
          name,
          phone,
          email,
          username,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Erro ao criar usuário" },
      { status: 500 }
    );
  }
}