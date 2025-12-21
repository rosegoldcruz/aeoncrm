export default function MembershipsPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header Tabs */}
      <div className="border-b border-neutral-800">
        <div className="flex items-center gap-6 px-6 overflow-x-auto">
          <button className="py-4 px-2 border-b-2 border-orange-500 text-orange-500 font-medium whitespace-nowrap">
            Memberships
          </button>
          <button className="py-4 px-2 text-neutral-400 hover:text-neutral-200 font-medium whitespace-nowrap flex items-center gap-1">
            Client Portal
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="py-4 px-2 text-neutral-400 hover:text-neutral-200 font-medium whitespace-nowrap flex items-center gap-1">
            Courses
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="py-4 px-2 text-neutral-400 hover:text-neutral-200 font-medium whitespace-nowrap flex items-center gap-1">
            Communities
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="py-4 px-2 text-neutral-400 hover:text-neutral-200 font-medium whitespace-nowrap flex items-center gap-2">
            Credentials
            <span className="px-2 py-0.5 bg-orange-500 text-black text-xs font-bold rounded">NEW</span>
          </button>
          <button className="py-4 px-2 text-neutral-400 hover:text-neutral-200 font-medium whitespace-nowrap flex items-center gap-2">
            Gokollab Marketplace
            <span className="px-2 py-0.5 bg-orange-500 text-black text-xs font-bold rounded">NEW</span>
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-orange-900/40 via-orange-800/30 to-orange-600/20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-3">Your Brand. Your App.</h1>
              <p className="text-lg text-neutral-300 mb-6">Launch your white-label app with courses and communities</p>
              <button className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg transition-colors">
                Learn More
              </button>
            </div>
            <div className="hidden lg:flex items-center gap-4">
              <div className="w-48 h-96 bg-neutral-900 rounded-3xl border border-neutral-700 shadow-2xl flex items-center justify-center">
                <svg className="w-16 h-16 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="w-48 h-96 bg-neutral-900 rounded-3xl border border-neutral-700 shadow-2xl flex items-center justify-center -ml-8">
                <svg className="w-16 h-16 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Left Content */}
          <div className="flex-1">
            {/* Dashboard Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
              <p className="text-neutral-400">Manage your client portal activities</p>
            </div>

            {/* Info Box */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mb-8">
              <p className="text-orange-200">Creating a protected online gateway for client interactions</p>
            </div>

            {/* What is a client portal? */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-3">What is a client portal?</h3>
              <p className="text-neutral-300 leading-relaxed">
                Your clients have the ability to log in at any time to the client portal for accessing courses,
                communities, and overseeing their affiliate payout.
              </p>
            </div>

            {/* Client Portal URL */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">Client Portal URL</h4>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-sm text-neutral-400">Invited</div>
                    <div className="text-2xl font-bold text-white">0</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-neutral-400">Users</div>
                    <div className="text-2xl font-bold text-white">1</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-black border border-neutral-700 rounded-lg px-4 py-3">
                  <code className="text-orange-400 text-sm">https://xtwqmq29pdgaJteRl7Ik.app.clientclub.net/</code>
                </div>
                <button className="px-4 py-3 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy
                </button>
              </div>
            </div>

            {/* Actions Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Generate Magic Link */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Generate Magic Link</h4>
                  <p className="text-sm text-neutral-400 mb-4">Create instant access links for clients</p>
                  <button className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg transition-colors">
                    Generate
                  </button>
                </div>

                {/* Invite To Client Portal */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Invite To Client Portal</h4>
                  <p className="text-sm text-neutral-400 mb-4">Send portal invitations to new clients</p>
                  <button className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg transition-colors">
                    Invite
                  </button>
                </div>

                {/* Send Login Email */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Send Login Email</h4>
                  <p className="text-sm text-neutral-400 mb-4">Email login credentials to clients</p>
                  <button className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="hidden xl:block w-80">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-white mb-4">Client Portal App</h3>
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
              <h4 className="text-base font-semibold text-white mb-2">Enhance Your Client Experience</h4>
              <p className="text-sm text-neutral-400 mb-4">
                Provide your clients with a seamless, branded experience through our white-label portal solution.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-sm text-neutral-300">
                  <svg
                    className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Custom branding and domain
                </li>
                <li className="flex items-start gap-2 text-sm text-neutral-300">
                  <svg
                    className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Secure client authentication
                </li>
                <li className="flex items-start gap-2 text-sm text-neutral-300">
                  <svg
                    className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Course and community access
                </li>
                <li className="flex items-start gap-2 text-sm text-neutral-300">
                  <svg
                    className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Affiliate payout tracking
                </li>
              </ul>
              <button className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
