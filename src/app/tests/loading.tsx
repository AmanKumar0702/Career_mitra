export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1e]">
      <div className="h-48 bg-gradient-to-br from-purple-700 to-indigo-900 animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-[#0f172a] rounded-2xl p-6 border border-gray-100 dark:border-[#1e293b] animate-pulse space-y-3">
              <div className="h-5 bg-gray-200 dark:bg-[#1e293b] rounded w-3/4" />
              <div className="h-3 bg-gray-100 dark:bg-[#263548] rounded w-full" />
              <div className="h-3 bg-gray-100 dark:bg-[#263548] rounded w-2/3" />
              <div className="flex gap-2 pt-2">
                <div className="h-6 w-16 bg-gray-200 dark:bg-[#1e293b] rounded-full" />
                <div className="h-6 w-20 bg-gray-200 dark:bg-[#1e293b] rounded-full" />
              </div>
              <div className="h-10 bg-gray-200 dark:bg-[#1e293b] rounded-xl mt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
