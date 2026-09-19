import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForTokens } from '@/lib/youtube';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error)}`, process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=missing_code', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  }

  const clientId = process.env.GOOGLE_CLIENT_ID ?? process.env.YOUTUBE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET ?? process.env.YOUTUBE_CLIENT_SECRET;
  const redirectUri = process.env.YOUTUBE_REDIRECT_URI ?? `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/youtube/callback`;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL('/login?error=missing_oauth_config', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  }

  try {
    const tokens = await exchangeCodeForTokens({
      code,
      clientId,
      clientSecret,
      redirectUri,
    });

    return NextResponse.json({ success: true, tokens });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown OAuth error';
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(message)}`, process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  }
}
