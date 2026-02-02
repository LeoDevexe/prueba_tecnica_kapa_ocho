export function ProjectsPageSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="flex gap-2">
          <div className="h-10 flex-1 max-w-xs bg-slate-200 dark:bg-slate-700 rounded-lg" />
          <div className="h-10 w-40 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        </div>
      </div>
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="h-12 bg-slate-100 dark:bg-slate-800" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-14 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
          />
        ))}
      </div>
    </div>
  );
}
