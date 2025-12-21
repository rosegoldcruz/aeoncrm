export default function PaymentsLoading() {
  return (
    <div className="min-h-screen bg-black text-neutral-100 p-6">
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-neutral-800 rounded w-48" />
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-neutral-800 rounded" />
          ))}
        </div>
        <div className="h-96 bg-neutral-800 rounded" />
      </div>
    </div>
  )
}
