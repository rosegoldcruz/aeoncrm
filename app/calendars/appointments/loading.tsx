export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="mb-8">
        <div className="h-10 w-64 bg-gray-800 rounded animate-pulse mb-2" />
        <div className="h-4 w-96 bg-gray-800 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4">
            <div className="h-4 w-32 bg-gray-800 rounded animate-pulse mb-2" />
            <div className="h-8 w-16 bg-gray-800 rounded animate-pulse" />
          </div>
        ))}
      </div>
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 mb-6">
        <div className="h-10 bg-gray-800 rounded animate-pulse" />
      </div>
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
            <div className="h-32 bg-gray-800 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}
