import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { updateLeagueStanding } from '../../../../../../features/standings/server/db/standings';

const validProperties = [
  'won',
  'draw',
  'loss',
  'goal',
  'goal_difference',
  'matches_played',
  'points',
];

export async function PATCH(
  request: Request,
  { params }: { params: { id: string; team_id: string } }
) {
  const { id, team_id } = params;

  if (!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(team_id)) {
    return NextResponse.json({
      status: 404,
      message: 'id or team_id is not a valid objectId',
    });
  }

  try {
    const body = await request.json();
    const convertObjToArray = Object.keys(body);
    const notValidKeys = convertObjToArray.filter(
      (key) => !validProperties.includes(key)
    );

    if (notValidKeys.length > 0) {
      return NextResponse.json({
        status: 400,
        message: `${notValidKeys.toString()} is not a valid body input`,
      });
    }
    const updatedLeagueStanding = await updateLeagueStanding(id, team_id, body);

    if (!updatedLeagueStanding) {
      return NextResponse.json({
        status: 404,
        message: "League and team points couldn't be updated",
      });
    }

    return NextResponse.json({
      status: 200,
      updatedLeagueStanding,
    });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
