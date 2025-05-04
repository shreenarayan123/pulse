import { User } from "../../../../model/user-model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import  dbConnect  from "@/lib/mongo";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const jwtSecret = process.env.JWT_SECRET || "secret";
    const token = jwt.sign({ id: savedUser._id }, jwtSecret);
    const response = NextResponse.json({
      message: "User created successfully",
      success: true,
      user: { username: savedUser.username, email: savedUser.email },
    });

    response.cookies.set({
      name:"token",
      value:token,
      httpOnly:true,
      sameSite:"strict",
      path:"/",
      maxAge:60 * 60 *24 *7 // 1 week
    })
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
