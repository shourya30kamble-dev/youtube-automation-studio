export type Channel = {
  id: string;
  name: string;
  handle: string;
  category: string;
  status: 'connected' | 'pending';
};

export type VideoQueueItem = {
  id: string;
  title: string;
  channelId: string;
  status: 'draft' | 'queued' | 'scheduled' | 'uploaded' | 'failed';
  scheduledAt: string;
  scriptSummary: string;
  thumbnailUrl?: string;
};

export type AnalyticsSnapshot = {
  views: number;
  watchTime: number;
  subscribers: number;
  ctr: number;
  rpm: number;
};

export type DashboardData = {
  channels: Channel[];
  queue: VideoQueueItem[];
  analytics: AnalyticsSnapshot;
};
