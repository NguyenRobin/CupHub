import { NextResponse } from 'next/server';
import { getCookieValue, verifyToken } from '../../../lib/server';
import UserModel from '../../../features/users/models/User';
import TournamentModel from '../../../features/tournaments/models/Tournament';
import connectToMongoDB from '../../../mongoose/connectToMongoDB';

export async function GET(request: Request) {
  const sessionToken = getCookieValue(request) ?? '';
  const tokenInfo = verifyToken(sessionToken);

  if (!tokenInfo) {
    return NextResponse.json({
      status: 401,
      message: 'Unauthorized Token not valid',
    });
  }

  try {
    await connectToMongoDB();

    // const user = await UserModel.findById({ _id: tokenInfo.id });
    // const userTournaments = await TournamentModel.find({
    //   createdByUserId: tokenInfo.id,
    // });

    const [user, userTournaments] = await Promise.all([
      UserModel.findById({ _id: tokenInfo.id }),
      TournamentModel.find({
        createdByUserId: tokenInfo.id,
      }),
    ]);

    return NextResponse.json({
      status: 200,
      message: 'success',
      data: {
        username: user.username,
        tournaments: userTournaments,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
