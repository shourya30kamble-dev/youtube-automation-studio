import { useState } from 'react';

const initialMetrics = [
  { label: 'Total Views', value: '182.3K' },
  { label: 'Watch Time', value: '45.6K hrs' },
  { label: 'Subscribers', value: '2,150' },
  { label: 'CTR', value: '6.8%' },
  { label: 'RPM', value: '$18.40' },
];

export default function Dashboard() {
  const [topic, setTopic] = useState('YouTube automation systems');
  const [audience, setAudience] = useState('new creators');
  const [channelName, setChannelName] = useState('Growth Lab');
  const [format, setFormat] = useState('tutorial');
  const [metadata, setMetadata] = useState<any>(null);

  async function handleGenerateMetadata() {
    const response = await fetch('/api/youtube/metadata', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, audience, channelName, format }),
    });

    const json = await response.json();
    setMetadata(json.metadata);
  }

  async function handleQueueVideo() {
    const response = await fetch('/api/content/queue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: topic,
        channelId: 'ch-1',
        scheduledAt: new Date().toISOString(),
        scriptSummary: `Draft for ${topic} aimed at ${audience}.`,
      }),
    });

    if (response.ok) {
      alert('Video queued successfully');
    }
  }

  return (
    <main className="container">
      <header className="topbar">
        <div className="brand">YouTube Automation Studio</div>
        <nav className="nav">
          <span className="badge">AI Metadata</span>
          <span className="badge">Scheduling</span>
          <span className="badge">Analytics</span>
        </nav>
      </header>

      <section className="hero">
        <div>
          <span className="badge">Workflow OS for creators</span>
          <h1>Build, schedule, and optimize your YouTube pipeline.</h1>
          <p>
            Automate research, generate metadata, queue uploads, track analytics, and keep every upload on schedule.
          </p>
          <div className="cta-row">
            <button className="primary-btn" onClick={handleQueueVideo}>Create queue item</button>
            <button className="secondary-btn" onClick={handleGenerateMetadata}>Generate metadata</button>
          </div>
        </div>
        <div className="card">
          <h3>Connected channels</h3>
          <div className="list">
            <div className="list-item"><strong>Growth Lab</strong><span className="status scheduled">Connected</span></div>
            <div className="list-item"><strong>Creator Studio</strong><span className="status queued">Pending</span></div>
          </div>
        </div>
      </section>

      <section className="dashboard-grid">
        {initialMetrics.map((metric) => (
          <div className="card" key={metric.label}>
            <h3>{metric.label}</h3>
            <div className="metric">{metric.value}</div>
          </div>
        ))}
      </section>

      <section className="grid-two">
        <div className="card">
          <h3>AI metadata generator</h3>
          <div className="form-grid">
            <div className="field">
              <label>Topic</label>
              <input value={topic} onChange={(e) => setTopic(e.target.value)} />
            </div>
            <div className="field">
              <label>Audience</label>
              <input value={audience} onChange={(e) => setAudience(e.target.value)} />
            </div>
            <div className="field">
              <label>Channel Name</label>
              <input value={channelName} onChange={(e) => setChannelName(e.target.value)} />
            </div>
            <div className="field">
              <label>Format</label>
              <select value={format} onChange={(e) => setFormat(e.target.value)}>
                <option value="tutorial">Tutorial</option>
                <option value="review">Review</option>
                <option value="case study">Case Study</option>
                <option value="news">News</option>
              </select>
            </div>
          </div>

          {metadata && (
            <div style={{ marginTop: 20 }}>
              <h4>Generated title</h4>
              <p><strong>{metadata.title}</strong></p>
              <h4>Description</h4>
              <p>{metadata.description}</p>
              <h4>Tags</h4>
              <p>{Array.isArray(metadata.tags) ? metadata.tags.join(', ') : ''}</p>
              <h4>Chapters</h4>
              <p>{Array.isArray(metadata.chapters) ? metadata.chapters.join(' • ') : ''}</p>
            </div>
          )}
        </div>

        <div className="card">
          <h3>Queue & publishing</h3>
          <div className="list">
            <div className="list-item">
              <strong>How to build a YouTube automation workflow</strong>
              <span className="status scheduled">Scheduled</span>
            </div>
            <div className="list-item">
              <strong>AI tools for creators that save hours weekly</strong>
              <span className="status queued">Queued</span>
            </div>
            <div className="list-item">
              <strong>Thumbnail split test workflow</strong>
              <span className="status uploaded">Uploaded</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
