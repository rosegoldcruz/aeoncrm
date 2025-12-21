export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950">
      <div className="w-full max-w-md p-8 bg-neutral-900 border border-neutral-800 rounded-lg">
        <h1 className="text-2xl font-bold text-orange-500 mb-6">AEON DIALER</h1>
        <p className="text-neutral-400 text-sm mb-8">Create Account</p>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded text-white"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded text-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded text-white"
          />
          <button className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded font-medium">
            Register
          </button>
        </div>
      </div>
    </div>
  )
}
