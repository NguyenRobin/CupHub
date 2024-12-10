import mongoose, { Types } from 'mongoose';
import { NextResponse } from 'next/server';
import connectToMongoDB from '../../../../mongoose/connectToMongoDB';
import UserModel from '../../../../features/users/models/User';
import { createToken, hashPassword } from '../../../../lib/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, username, password } = body;
    const hashedPassword = await hashPassword(password);

    const user = {
      username,
      email,
      password: hashedPassword,
    };

    await connectToMongoDB();

    //! change to promiseAll
    const existingEmail = await UserModel.findOne({ email });
    const existingUsername = await UserModel.findOne({ username });

    if (existingUsername && existingEmail) {
      return NextResponse.json({
        status: 404,
        signup_info: 'email_and_username_taken',
        message:
          'Both the username and email address are already taken. Please choose different options.',
      });
    }

    if (existingEmail && !existingUsername) {
      return NextResponse.json({
        status: 404,
        signup_info: 'email_taken',
        message:
          'Email address is already in use. Please use a different email.',
      });
    }

    if (existingUsername && !existingEmail) {
      return NextResponse.json({
        status: 404,
        signup_info: 'username_taken',
        message: 'Username is already taken. Please choose another one.',
      });
    }

    const newUser = new UserModel(user);

    await newUser.save();

    const userPayload = {
      id: newUser._id,
      username: newUser.username,
    };

    const token = createToken(userPayload);

    const session = (await cookies()).set(process.env.TOKEN_NAME!, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 15, // 15 minutes //! later this should automatically update every time a new request is made is token still valid
    });

    return NextResponse.json({
      status: 201,
      message: 'User successfully created',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: 'Error creating a user',
    });
  }
}
