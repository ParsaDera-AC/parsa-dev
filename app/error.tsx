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
    <div className="page" style={{ padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Something went wrong</h1>
      <p className="mt-3">The page hit an error while loading.</p>
      <p className="mt-3">
        <button type="button" className="textbutton" onClick={reset}>
          Try again
        </button>
      </p>
    </div>
  );
}
