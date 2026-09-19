import { NextRequest, NextResponse } from 'next/server';
import { readDashboardData, writeDashboardData } from '@/lib/storage';

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing queue item id' }, { status: 400 });
  }

  const data = readDashboardData();
  data.queue = data.queue.filter((item) => item.id !== id);
  writeDashboardData(data);

  return NextResponse.json({ success: true });
}
