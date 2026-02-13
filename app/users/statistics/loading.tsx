export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-neutral-800 border-t-orange-500 mx-auto" />
        <p className="text-neutral-400">Loading user statistics...</p>
      </div>
    </div>
  )
}
