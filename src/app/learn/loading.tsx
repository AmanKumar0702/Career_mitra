export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1e]">
      {/* Hero skeleton */}
      <div className="h-64 bg-gradient-to-br from-blue-700 to-indigo-900 animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter skeleton */}
        <div className="h-12 bg-gray-200 dark:bg-[#1e293b] rounded-xl mb-6 animate-pulse" />
        <div className="flex gap-2 mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 w-24 bg-gray-200 dark:bg-[#1e293b] rounded-xl animate-pulse" />
          ))}
        </div>
        {/* Cards skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-[#0f172a] rounded-2xl overflow-hidden border border-gray-100 dark:border-[#1e293b] animate-pulse">
              <div className="h-36 bg-gray-200 dark:bg-[#1e293b]" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-[#1e293b] rounded w-3/4" />
                <div className="h-3 bg-gray-100 dark:bg-[#263548] rounded w-full" />
                <div className="h-3 bg-gray-100 dark:bg-[#263548] rounded w-2/3" />
                <div className="h-9 bg-gray-200 dark:bg-[#1e293b] rounded-xl mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
