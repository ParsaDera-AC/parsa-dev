import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="page" style={{ padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Page not found</h1>
      <p className="mt-3">There&apos;s nothing at this address.</p>
      <p className="mt-3">
        <Link href="/">Go to the home page</Link>
      </p>
    </div>
  );
}
