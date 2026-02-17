import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import GabaritoModel from "@/models/gabaritoModel";

export async function GET() {
  try {
    await connectDB();

    const all = await GabaritoModel.find();

    return NextResponse.json(all, { status: 200 });

  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Deu erro" },
      { status: 500 }
    );
  }
}
