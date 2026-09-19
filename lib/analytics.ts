export async function getYouTubeAnalyticsMock() {
  return {
    views: 182340,
    watchTime: 45600,
    subscribers: 2150,
    ctr: 6.8,
    rpm: 18.4,
  };
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}
