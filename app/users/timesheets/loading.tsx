export default function TimesheetsLoading() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="animate-pulse space-y-6">
        <div className="h-12 bg-neutral-800 rounded w-64" />
        <div className="grid grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-neutral-800 rounded" />
          ))}
        </div>
        <div className="h-96 bg-neutral-800 rounded" />
      </div>
    </div>
  )
}
