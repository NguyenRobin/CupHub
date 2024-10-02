import connectToMongoDB from "@/lib/connectToMongoDB";
import { compareUserInputPasswordWithHashedPassword } from "@/lib/server/serverHelperFunc";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    if (!username && !email && !password) {
      return NextResponse.json({
        status: 400,
        message: "username or email and password are required",
      });
    }

    if ((username || email) && !password) {
      return NextResponse.json({
        status: 400,
        message: "Password is required",
      });
    }

    if (!username && !email && password) {
      return NextResponse.json({
        status: 400,
        message: "username or email is required",
      });
    }

    if (username && password) {
      await connectToMongoDB();
      const user = await UserModel.findOne({ username });

      if (!user) {
        return NextResponse.json({ status: 400, message: "User not found" });
      }

      const isPasswordCorrect =
        await compareUserInputPasswordWithHashedPassword(
          password,
          user.password
        );

      if (!isPasswordCorrect) {
        return NextResponse.json({
          status: 401,
          message: "You have entered an invalid email or password",
        });
      }

      return NextResponse.json({
        status: 200,
        message: "here is your fucking tokwen",
      });
    }

    if (email && password) {
      await connectToMongoDB();
      const user = await UserModel.findOne({ email });

      if (!user) {
        return NextResponse.json({ status: 400, message: "User not found" });
      }

      const isPasswordCorrect =
        await compareUserInputPasswordWithHashedPassword(
          password,
          user.password
        );

      if (!isPasswordCorrect) {
        return NextResponse.json({
          status: 401,
          message: "You have entered an invalid username or password",
        });
      }

      return NextResponse.json({
        status: 200,
        message: "here is your fucking tokwen",
      });
    }
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
