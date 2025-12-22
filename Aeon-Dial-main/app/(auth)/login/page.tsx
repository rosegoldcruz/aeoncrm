export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950">
      <div className="w-full max-w-md p-8 bg-neutral-900 border border-neutral-800 rounded-lg text-center">
        <h1 className="text-2xl font-bold text-orange-500 mb-4">AEON DIAL</h1>
        <p className="text-neutral-400 mb-6">Authentication coming soon</p>
        <a href="/dashboard" className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium">
          Continue to Dashboard
        </a>
      </div>
    </div>
  )
}
