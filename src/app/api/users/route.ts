import mongoose, { Types } from 'mongoose';
import { NextResponse } from 'next/server';
import connectToMongoDB from '../../../mongoose/connectToMongoDB';
import UserModel from '../../../features/users/models/User';
import { createToken, hashPassword } from '../../../lib/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    await connectToMongoDB();
    const users = await UserModel.find();
    return NextResponse.json({
      status: 200,
      message: 'success',
      result: users.length,
      users,
    });
  } catch (error: any) {
    return NextResponse.json({ status: 404, message: error.message });
  }
}

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
    console.log(newUser);
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
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { userId, newUsername } = body;
    await connectToMongoDB();

    if (!userId || !newUsername) {
      return NextResponse.json({
        message: 'Invalid request. Missing userId or new username',
        status: 400,
      });
    }

    if (!mongoose.isValidObjectId(userId)) {
      return NextResponse.json({
        message: 'Invalid userId for ObjectId',
        status: 400,
      });
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      // convert string to ObjectID
      { _id: Types.ObjectId.createFromHexString(userId) },
      { username: newUsername },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({
        message: 'User not found',
        status: 400,
      });
    }
    return NextResponse.json({
      status: 200,
      message: 'success',
      user: updatedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}

export async function DELETE(request: Request) {
  try {
    console.log(request.url);
    const { searchParams } = new URL(request.url); // http://localhost:3000/api/
    const userId = searchParams.get('userId'); //retrieve the query parameter 1

    if (!userId) {
      return NextResponse.json({
        message: 'Invalid request. Missing userId.',
        status: 400,
      });
    }

    if (!mongoose.isValidObjectId(userId)) {
      return NextResponse.json({
        message: 'Invalid userId for ObjectId',
        status: 400,
      });
    }

    await connectToMongoDB();

    const deletedUser = await UserModel.findByIdAndDelete(
      Types.ObjectId.createFromHexString(userId)
    );

    if (!deletedUser) {
      return NextResponse.json({
        message: 'User not found',
        status: 400,
      });
    }

    return NextResponse.json({
      status: 200,
      message: 'success',
      user: deletedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
