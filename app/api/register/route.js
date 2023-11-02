import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectMongooDB } from "@/lib/mongodb";
import User from "@/models/user";
export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongooDB();
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User register" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
