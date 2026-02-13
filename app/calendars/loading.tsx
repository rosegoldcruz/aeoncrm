export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-neutral-400">Loading calendars...</p>
      </div>
    </div>
  )
}
