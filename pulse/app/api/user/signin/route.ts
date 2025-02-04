import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../../../model/user-model";
import  dbConnect  from "@/lib/mongo";


await dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const jwtSecret = process.env.JWT_SECRET || "secret";
    const token = jwt.sign({ id: user._id }, jwtSecret);

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      user: user
    });

    response.cookies.set({
      name:"token",
      value:token,
      path:"/",
      httpOnly:true,
      sameSite:"strict",
      maxAge:60 *60 * 24 * 7 // 7days
    })

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
