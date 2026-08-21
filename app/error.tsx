'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="shell flex min-h-dvh items-center justify-center">
      <div className="max-w-md border-t border-rule pt-8">
        <p className="eyebrow">Error</p>
        <h1 className="mt-5 text-display-sm">Something went wrong</h1>
        <p className="mt-4 leading-relaxed text-ink-muted">
          An unexpected error occurred. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 bg-clay px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-clay-deep"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
