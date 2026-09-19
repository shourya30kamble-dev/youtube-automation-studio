import { readDashboardData, writeDashboardData } from '@/lib/storage';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const data = readDashboardData();
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const current = readDashboardData();

  const nextQueueItem = {
    id: `q-${Date.now()}`,
    title: body.title ?? 'Untitled video',
    channelId: body.channelId ?? current.channels[0]?.id ?? 'ch-1',
    status: body.status ?? 'queued',
    scheduledAt: body.scheduledAt ?? new Date().toISOString(),
    scriptSummary: body.scriptSummary ?? 'New automation task created.',
    thumbnailUrl: body.thumbnailUrl,
  };

  current.queue = [nextQueueItem, ...current.queue];
  writeDashboardData(current);

  return NextResponse.json({ success: true, data: nextQueueItem });
}
