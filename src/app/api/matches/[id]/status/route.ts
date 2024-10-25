import { NextResponse } from 'next/server';
import { updateMatchStatusDB } from '../../../../../features/matches/server/db/match';
import MatchModel from '../../../../../features/matches/models/Match';
import GroupModel from '../../../../../features/groups/models/Group';
import TournamentModel from '../../../../../features/tournaments/models/Tournament';
import {
  TGroup,
  TStanding,
  TTeam,
  TTeamStanding,
  TTournament,
} from '../../../../../types/types';
import { Types } from 'mongoose';
import { updateMatchStatus } from '../../../../../features/matches/server/actions/match';

export async function PATCH(
  request: Request,
  { params }: { params: { id: Types.ObjectId } }
) {
  const match_id = params.id;
  try {
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({
        status: 400,
        message: 'body must include "status"',
      });
    }

    const updatedMatchStatusResponse = await updateMatchStatus(
      match_id,
      status
    );

    return NextResponse.json(updatedMatchStatusResponse);
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: 'Error updating a match',
      errorMsg: error,
    });
  }
}
