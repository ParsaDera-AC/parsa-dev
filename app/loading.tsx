export default function Loading() {
  return (
    <div className="shell flex min-h-[40vh] items-center justify-center">
      <div className="flex items-center gap-3 text-ink-faint" aria-label="Loading">
        <span className="h-px w-10 bg-rule" aria-hidden="true" />
        <span className="h-2 w-2 animate-pulse bg-clay" aria-hidden="true" />
        <span className="h-px w-10 bg-rule" aria-hidden="true" />
      </div>
    </div>
  );
}
