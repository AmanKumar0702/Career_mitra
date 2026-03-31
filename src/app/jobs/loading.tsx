export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1e]">
      <div className="h-48 bg-gradient-to-br from-emerald-700 to-teal-900 animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-3 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-9 w-24 bg-gray-200 dark:bg-[#1e293b] rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-gray-100 dark:border-[#1e293b] animate-pulse flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-[#1e293b] flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-[#1e293b] rounded w-1/2" />
                <div className="h-3 bg-gray-100 dark:bg-[#263548] rounded w-3/4" />
                <div className="flex gap-2">
                  <div className="h-5 w-16 bg-gray-100 dark:bg-[#263548] rounded-full" />
                  <div className="h-5 w-20 bg-gray-100 dark:bg-[#263548] rounded-full" />
                </div>
              </div>
              <div className="w-24 h-9 bg-gray-200 dark:bg-[#1e293b] rounded-xl flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
