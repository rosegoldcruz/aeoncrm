export default function ReputationLoading() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="animate-pulse space-y-6">
        <div className="h-12 bg-neutral-900 rounded w-1/3" />
        <div className="grid grid-cols-3 gap-6">
          <div className="h-64 bg-neutral-900 rounded" />
          <div className="h-64 bg-neutral-900 rounded" />
          <div className="h-64 bg-neutral-900 rounded" />
        </div>
        <div className="h-96 bg-neutral-900 rounded" />
      </div>
    </div>
  )
}
