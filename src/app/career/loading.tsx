export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1e]">
      <div className="h-48 bg-gradient-to-br from-cyan-700 to-indigo-900 animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-[#0f172a] rounded-2xl p-6 border border-gray-100 dark:border-[#1e293b] animate-pulse">
                <div className="h-5 bg-gray-200 dark:bg-[#1e293b] rounded w-1/2 mb-3" />
                <div className="h-3 bg-gray-100 dark:bg-[#263548] rounded w-full mb-2" />
                <div className="h-3 bg-gray-100 dark:bg-[#263548] rounded w-3/4" />
              </div>
            ))}
          </div>
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-6 border border-gray-100 dark:border-[#1e293b] animate-pulse h-80" />
        </div>
      </div>
    </div>
  );
}
