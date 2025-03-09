import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

// for registering the new user
export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await dbConnect();
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "user already exists" },
        { status: 400 }
      );
    }

    await User.create({
      name,
      email,
      password,
    });

    return NextResponse.json({ message: "user created" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to create user with error: ${error}` },
      { status: 500 }
    );
  }
}
