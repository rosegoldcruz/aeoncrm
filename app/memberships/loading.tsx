export default function MembershipsLoading() {
  return (
    <div className="min-h-screen bg-black">
      <div className="border-b border-neutral-800">
        <div className="flex items-center gap-6 px-6">
          <div className="h-12 w-32 bg-neutral-800 animate-pulse rounded" />
          <div className="h-12 w-32 bg-neutral-800 animate-pulse rounded" />
          <div className="h-12 w-32 bg-neutral-800 animate-pulse rounded" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="h-64 bg-neutral-900 animate-pulse rounded-lg mb-8" />
        <div className="h-96 bg-neutral-900 animate-pulse rounded-lg" />
      </div>
    </div>
  )
}
