import { NextRequest, NextResponse } from 'next/server';
import { buildYouTubeAuthUrl } from '@/lib/youtube';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const clientId = process.env.GOOGLE_CLIENT_ID ?? process.env.YOUTUBE_CLIENT_ID;
  const redirectUri = process.env.YOUTUBE_REDIRECT_URI ?? `${process.env.NEXT_PUBLIC_APP_URL}/api/youtube/callback`;

  if (!clientId || !redirectUri) {
    return NextResponse.json({ error: 'Missing Google or YouTube OAuth credentials' }, { status: 400 });
  }

  const authUrl = buildYouTubeAuthUrl(clientId, redirectUri);
  return NextResponse.json({ authUrl });
}
