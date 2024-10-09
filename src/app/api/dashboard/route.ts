import { NextResponse } from "next/server";
import {
  getCookieValue,
  verifyToken,
} from "../../../lib/server/serverHelperFunc";
import UserModel from "../../../models/User";
import TournamentModel from "../../../models/Tournament";
import connectToMongoDB from "../../../lib/connectToMongoDB";

export async function GET(request: Request) {
  const sessionToken = getCookieValue(request) ?? "";
  const tokenInfo = verifyToken(sessionToken);

  if (!tokenInfo) {
    return NextResponse.json({ message: "dick head" });
  }

  // ändra till promiseAll sen

  try {
    await connectToMongoDB();

    const user = await UserModel.findById({ _id: tokenInfo.id });
    const userTournaments = await TournamentModel.find({
      createdByUserId: tokenInfo.id,
    });

    return NextResponse.json({
      status: 200,
      message: "success",
      data: {
        username: user.username,
        tournaments: userTournaments,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
