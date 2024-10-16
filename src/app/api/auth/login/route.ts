import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import connectToMongoDB from '../../../../lib/server/connectToMongoDB';
import UserModel from '../../../../models/User';
import {
  compareUserInputPasswordWithHashedPassword,
  createToken,
} from '../../../../lib/server';
import { env } from 'process';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { username, email, password } = body;

    if (!username && !email && !password) {
      return NextResponse.json({
        status: 400,
        message: 'username or email and password are required',
      });
    }

    if ((username || email) && !password) {
      return NextResponse.json({
        status: 400,
        message: 'Password is required',
      });
    }

    if (!username && !email && password) {
      return NextResponse.json({
        status: 400,
        message: 'username or email is required',
      });
    }

    if (username && password) {
      await connectToMongoDB();
      const user = await UserModel.findOne({ username });

      if (!user) {
        return NextResponse.json({ status: 400, message: 'User not found' });
      }

      const isPasswordCorrect =
        await compareUserInputPasswordWithHashedPassword(
          password,
          user.password
        );

      if (!isPasswordCorrect) {
        return NextResponse.json({
          status: 401,
          message: 'You have entered an invalid email or password',
        });
      } else {
        const userPayload = {
          id: user._id,
          username: user.username,
        };

        const token = createToken(userPayload);
        const oneDay = 24 * 60 * 60 * 1000;
        const session = cookies().set(process.env.TOKEN_NAME!, token, {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
          path: '/',
          maxAge: oneDay,
          // maxAge: 60 * 15,
        });

        return NextResponse.json({
          status: 200,
          message: token,
        });
      }
    }
    if (email && password) {
      await connectToMongoDB();
      const user = await UserModel.findOne({ email });

      if (!user) {
        return NextResponse.json({ status: 404, message: 'User not found' });
      }

      const isPasswordCorrect =
        await compareUserInputPasswordWithHashedPassword(
          password,
          user.password
        );

      if (!isPasswordCorrect) {
        return NextResponse.json({
          status: 401,
          message: 'You have entered an invalid username or password',
        });
      } else {
        const userPayload = {
          id: user._id,
          username: user.username,
        };

        const token = createToken(userPayload);

        return NextResponse.json({
          status: 200,
          message: token,
        });
      }
    }
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
