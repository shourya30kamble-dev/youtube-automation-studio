import { NextRequest, NextResponse } from 'next/server';
import { readDashboardData, writeDashboardData } from '@/lib/storage';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const data = readDashboardData();
  const item = data.queue.find((entry) => entry.id === params.id);

  if (!item) {
    return NextResponse.json({ error: 'Queue item not found' }, { status: 404 });
  }

  const body = await request.json();
  item.status = body.status ?? item.status;
  item.title = body.title ?? item.title;
  item.scriptSummary = body.scriptSummary ?? item.scriptSummary;

  writeDashboardData(data);
  return NextResponse.json({ success: true, data: item });
}
