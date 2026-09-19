export type ContentPlanItem = {
  day: string;
  title: string;
  objective: string;
  topic: string;
  assetType: 'Short' | 'Long-form' | 'Thumbnail test' | 'Community post';
};

export function buildContentPlan({
  niche,
  cadence,
  channel,
}: {
  niche: string;
  cadence: string;
  channel: string;
}): ContentPlanItem[] {
  const base = [
    { day: 'Monday', objective: 'Topic authority', topic: `${niche} fundamentals`, assetType: 'Long-form' },
    { day: 'Tuesday', objective: 'Fast engagement', topic: `${niche} trends`, assetType: 'Short' },
    { day: 'Wednesday', objective: 'Audience education', topic: `${niche} workflows`, assetType: 'Long-form' },
    { day: 'Thursday', objective: 'Retention optimization', topic: `${niche} thumbnail ideas`, assetType: 'Thumbnail test' },
    { day: 'Friday', objective: 'Community building', topic: `${niche} Q&A`, assetType: 'Community post' },
    { day: 'Saturday', objective: 'Traffic boost', topic: `${niche} case study`, assetType: 'Short' },
    { day: 'Sunday', objective: 'Recap and repurpose', topic: `${niche} summary`, assetType: 'Long-form' },
  ];

  return base.map((entry, index) => ({
    ...entry,
    title: `${channel}: ${entry.topic} ${index + 1}`,
    day: entry.day,
  }));
}
