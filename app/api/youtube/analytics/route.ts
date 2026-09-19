import { NextRequest, NextResponse } from 'next/server';
import { generateMetadata } from '@/lib/youtube';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const metadata = await generateMetadata({
    topic: body.topic ?? 'content strategy',
    audience: body.audience ?? 'beginner creators',
    channelName: body.channelName ?? 'Creator Studio',
    format: body.format ?? 'tutorial',
  });

  return NextResponse.json({ metadata });
}
