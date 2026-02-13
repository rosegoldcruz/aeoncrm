export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="animate-pulse space-y-6">
        <div className="h-12 bg-white/5 rounded w-1/3" />
        <div className="h-96 bg-white/5 rounded" />
      </div>
    </div>
  )
}
