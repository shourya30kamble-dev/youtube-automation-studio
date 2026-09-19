import { NextResponse } from 'next/server';
import { getYouTubeAnalyticsMock } from '@/lib/analytics';

export async function GET() {
  const analytics = await getYouTubeAnalyticsMock();
  return NextResponse.json({ analytics });
}
