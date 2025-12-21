export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center py-28 px-6">
        <h1 className="text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-purple-500 to-orange-400 bg-clip-text text-transparent">
          AEON Dial
        </h1>

        <p className="text-gray-400 text-xl max-w-2xl mb-10 leading-relaxed">
          A next-generation operating system for contractors, call centers, outbound agents, 
          and AI-driven business execution.  
          <br />Built to be fast. Built to scale. Built to dominate.
        </p>

        <div className="flex gap-4">
          <a
            href="/dashboard"
            className="px-8 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-lg font-semibold"
          >
            Go to Dashboard
          </a>

          <a
            href="#features"
            className="px-8 py-3 rounded-lg bg-white text-black hover:bg-gray-200 transition text-lg font-semibold"
          >
            View Features
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6 bg-zinc-900 border-t border-zinc-800">
        <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">
          Why AEON Dial Exists
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <FeatureCard
            title="AI Outbound Engine"
            text="Eliminate manual dialing. Automate outreach. Optimize conversations with real-time AI assistance."
          />
          <FeatureCard
            title="Unified Contractor Dashboard"
            text="Track leads, quotes, jobs, and team ops in one centralized command center."
          />
          <FeatureCard
            title="Real-Time Intelligence"
            text="Live ops monitoring, alerts, statuses, timelines, and tactical reporting built into the core."
          />
          <FeatureCard
            title="Operations Workflow"
            text="Task flows, agent handoff logic, compliance layers, and automated progression through each pipeline."
          />
          <FeatureCard
            title="Integrated Agents"
            text="AI agents that support lead intake, outbound follow-up, quoting, verification, and customer onboarding."
          />
          <FeatureCard
            title="Enterprise-Grade System"
            text="Fast, resilient, modern infrastructure built on Next.js & Vercel — optimized for scale."
          />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">What is AEON Dial?</h2>
        <p className="text-gray-400 text-lg leading-relaxed">
          AEON Dial is the front-end activation layer of the Advanced Efficient Optimized Network.
          It’s built for speed, automation, and executing real operations for contractors,
          home-service pros, call centers, and AI-driven outbound teams.  
          <br /><br />
          This isn’t a CRM. This is a full operating system — one command center powering
          your entire workflow.
        </p>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-6 text-center bg-gradient-to-b from-purple-900/10 to-black">
        <h2 className="text-4xl font-bold mb-4">Ready to Enter the Command Center?</h2>
        <p className="text-gray-400 mb-10">
          Your dashboard is fully operational. Dive into the AEON OS now.
        </p>
        <a
          href="/dashboard"
          className="px-10 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 transition text-xl font-semibold"
        >
          Launch Dashboard
        </a>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 text-gray-500 text-sm border-t border-zinc-800">
        © {new Date().getFullYear()} AEON Dial • Advanced Efficient Optimized Network
      </footer>
    </main>
  );
}

// Reusable feature card
function FeatureCard({ title, text }) {
  return (
    <div className="p-8 rounded-2xl bg-zinc-800 border border-zinc-700 hover:border-purple-500 transition">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{text}</p>
    </div>
  );
}