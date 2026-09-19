const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';

export function buildYouTubeAuthUrl(clientId: string, redirectUri: string) {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: [
      'https://www.googleapis.com/auth/youtube',
      'https://www.googleapis.com/auth/youtube.upload',
      'https://www.googleapis.com/auth/yt-analytics.readonly',
      'openid',
      'email',
      'profile',
    ].join(' '),
    access_type: 'offline',
    prompt: 'consent',
  });

  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
}

export async function exchangeCodeForTokens({
  code,
  clientId,
  clientSecret,
  redirectUri,
}: {
  code: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}) {
  const body = new URLSearchParams({
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  });

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error('Unable to exchange Google auth code for tokens');
  }

  return response.json();
}

export async function generateMetadata({
  topic,
  audience,
  channelName,
  format,
}: {
  topic: string;
  audience: string;
  channelName: string;
  format: string;
}) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return {
      title: `${topic} for ${audience}: The ${channelName} strategy`,
      description: `Discover the best way to approach ${topic} for ${audience}. This ${format} video is built to educate, inspire, and convert viewers into loyal subscribers.`,
      tags: ['youtube', 'content strategy', topic, audience, channelName],
      chapters: ['Intro', 'Core concept', 'Action steps', 'Summary'],
    };
  }

  const prompt = `Create metadata for a YouTube video in JSON format with keys: title, description, tags, chapters. Topic: ${topic}. Audience: ${audience}. Channel: ${channelName}. Format: ${format}. Keep it compelling and SEO-friendly.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error('Unable to generate metadata from OpenAI');
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content ?? '{}';

  try {
    return JSON.parse(content);
  } catch {
    return {
      title: `${topic} for ${audience}`,
      description: `Learn more about ${topic} for ${audience}.`,
      tags: [topic, audience, 'youtube'],
      chapters: ['Intro', 'Main points', 'Summary'],
    };
  }
}
