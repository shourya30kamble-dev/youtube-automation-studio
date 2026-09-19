export default function DashboardPage() {
  return (
    <main style={{ padding: 24 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gap: 24 }}>
        <h1 style={{ margin: 0 }}>Dashboard</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 24 }}>
          <aside style={{ background: '#111827', color: 'white', borderRadius: 18, padding: 20, minHeight: 540 }}>
            <h3 style={{ marginTop: 0 }}>Studio</h3>
            <div style={{ display: 'grid', gap: 10 }}>
              <div>Overview</div>
              <div>Channels</div>
              <div>Content queue</div>
              <div>Automation</div>
              <div>Analytics</div>
            </div>
          </aside>

          <section style={{ display: 'grid', gap: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(180px, 1fr))', gap: 16 }}>
              {[
                ['Views', '182.3K'],
                ['Watch time', '45.6K hrs'],
                ['Subscribers', '2,150'],
                ['CTR', '6.8%'],
              ].map(([label, value]) => (
                <div key={label} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 16, padding: 20 }}>
                  <div style={{ color: '#64748b', fontSize: 12 }}>{label}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, marginTop: 10 }}>{value}</div>
                </div>
              ))}
            </div>

            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 16, padding: 20 }}>
              <h3 style={{ marginTop: 0 }}>Publishing queue</h3>
              <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 2 }}>
                <li>How to automate YouTube publishing</li>
                <li>AI tools for creators that save hours</li>
                <li>Thumbnail split test workflow</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
