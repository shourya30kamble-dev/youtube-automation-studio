import Link from 'next/link';

export default function LoginPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f3f6ff' }}>
      <div style={{ width: 'min(480px, 90vw)', background: 'white', borderRadius: 22, padding: 32, border: '1px solid #e6ebf5', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)' }}>
        <h1 style={{ marginTop: 0 }}>Connect your YouTube account</h1>
        <p style={{ color: '#4b5563', lineHeight: 1.6 }}>
          Connect Google OAuth to upload videos, sync analytics, and manage your publishing workflow.
        </p>

        <div style={{ display: 'grid', gap: 12, marginTop: 26 }}>
          <a
            href="/api/youtube/auth"
            style={{
              display: 'inline-flex',
              justifyContent: 'center',
              padding: '14px 18px',
              borderRadius: 12,
              background: '#2563eb',
              color: 'white',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Connect YouTube
          </a>

          <Link href="/dashboard" style={{
            display: 'inline-flex',
            justifyContent: 'center',
            padding: '14px 18px',
            borderRadius: 12,
            border: '1px solid #dfe5f2',
            color: '#0f172a',
            textDecoration: 'none',
            fontWeight: 700,
          }}>
            Continue without connecting
          </Link>
        </div>
      </div>
    </main>
  );
}
