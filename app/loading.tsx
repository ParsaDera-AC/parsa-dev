export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-purple-200 dark:border-purple-900" />
        <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-transparent border-t-purple-500 animate-spin" />
      </div>
    </div>
  );
}
