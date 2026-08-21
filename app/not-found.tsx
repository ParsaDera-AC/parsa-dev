import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="shell flex min-h-dvh items-center justify-center">
      <div className="max-w-md border-t border-rule pt-8">
        <p className="eyebrow">404</p>
        <h1 className="mt-5 text-display">Page not found</h1>
        <p className="mt-4 leading-relaxed text-ink-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block bg-clay px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-clay-deep"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
