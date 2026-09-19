import { NextRequest, NextResponse } from 'next/server';
import { buildContentPlan } from '@/lib/automation';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const plan = buildContentPlan({
    niche: body.niche ?? 'creator growth',
    cadence: body.cadence ?? '5 uploads/week',
    channel: body.channel ?? 'Growth Lab',
  });

  return NextResponse.json({
    success: true,
    plan,
    cadence: body.cadence ?? '5 uploads/week',
  });
}
