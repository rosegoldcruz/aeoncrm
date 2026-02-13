export default function LeadsLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-neutral-800 rounded animate-pulse" />
          <div className="h-4 w-64 bg-neutral-800 rounded animate-pulse" />
        </div>
      </div>
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 space-y-6">
        <div className="h-32 bg-neutral-800 rounded animate-pulse" />
        <div className="h-64 bg-neutral-800 rounded animate-pulse" />
      </div>
    </div>
  )
}
