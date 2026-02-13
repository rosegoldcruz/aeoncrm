export default function Loading() {
  return (
    <div className="min-h-screen bg-black p-3 sm:p-6">
      <div className="space-y-6 animate-pulse">
        <div className="h-12 bg-neutral-800 rounded w-1/3" />
        <div className="grid grid-cols-3 gap-6">
          <div className="h-32 bg-neutral-800 rounded" />
          <div className="h-32 bg-neutral-800 rounded" />
          <div className="h-32 bg-neutral-800 rounded" />
        </div>
        <div className="h-64 bg-neutral-800 rounded" />
      </div>
    </div>
  )
}
