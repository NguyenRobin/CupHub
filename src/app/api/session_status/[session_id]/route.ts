import { NextRequest, NextResponse } from 'next/server';
import { getCheckoutSessionById } from '../../../../features/stripe/server/actions/stripe';

export async function GET(
  request: Request,
  { params }: { params: { session_id: string } }
) {
  try {
    const { session_id } = params;
    const session = await getCheckoutSessionById(session_id);

    return NextResponse.json({
      status: 200,
      session,
    });
  } catch (error) {
    console.log('Error at api/stripe/session_status', error);
    return NextResponse.json({ message: 'no' });
  }
}
