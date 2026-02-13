export default function ListDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-orange-500">List Details</h1>
      <p className="text-neutral-400">List ID: {params.id}</p>
    </div>
  )
}
