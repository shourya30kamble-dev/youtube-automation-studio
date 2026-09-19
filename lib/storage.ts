import fs from 'fs';
import path from 'path';

const STORAGE_PATH = path.join(process.cwd(), 'data', 'store.json');

export type DashboardData = {
  channels: Array<{
    id: string;
    name: string;
    handle: string;
    category: string;
    status: 'connected' | 'pending';
  }>;
  queue: Array<{
    id: string;
    title: string;
    channelId: string;
    status: 'draft' | 'queued' | 'scheduled' | 'uploaded' | 'failed';
    scheduledAt: string;
    scriptSummary: string;
    thumbnailUrl?: string;
  }>;
  analytics: {
    views: number;
    watchTime: number;
    subscribers: number;
    ctr: number;
    rpm: number;
  };
};

export function ensureStorageFile() {
  const dir = path.dirname(STORAGE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(STORAGE_PATH)) {
    const seedData: DashboardData = {
      channels: [
        { id: 'ch-1', name: 'Growth Lab', handle: '@growthlab', category: 'Business', status: 'connected' },
        { id: 'ch-2', name: 'Creator Studio', handle: '@creatorstudio', category: 'Education', status: 'pending' },
      ],
      queue: [
        {
          id: 'q-1',
          title: 'How to build a YouTube automation workflow',
          channelId: 'ch-1',
          status: 'scheduled',
          scheduledAt: '2026-09-26T18:00:00.000Z',
          scriptSummary: 'A step-by-step guide to automate publishing and analytics tasks.',
        },
        {
          id: 'q-2',
          title: 'AI tools for creators that save hours weekly',
          channelId: 'ch-1',
          status: 'queued',
          scheduledAt: '2026-09-28T14:00:00.000Z',
          scriptSummary: 'Best practices for combining AI systems with video workflows.',
        },
      ],
      analytics: {
        views: 182340,
        watchTime: 45600,
        subscribers: 2150,
        ctr: 6.8,
        rpm: 18.4,
      },
    };

    fs.writeFileSync(STORAGE_PATH, JSON.stringify(seedData, null, 2), 'utf-8');
  }
}

export function readDashboardData(): DashboardData {
  ensureStorageFile();
  const raw = fs.readFileSync(STORAGE_PATH, 'utf-8');
  return JSON.parse(raw) as DashboardData;
}

export function writeDashboardData(data: DashboardData) {
  ensureStorageFile();
  fs.writeFileSync(STORAGE_PATH, JSON.stringify(data, null, 2), 'utf-8');
}
