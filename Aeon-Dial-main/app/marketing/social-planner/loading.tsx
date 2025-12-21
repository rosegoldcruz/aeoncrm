export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent mb-4"></div>
        <p className="text-neutral-400">Loading social planner...</p>
      </div>
    </div>
  )
}
