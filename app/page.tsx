import { SignIn } from "@clerk/nextjs"

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
      <SignIn
        path="/"
        routing="path"
        signUpUrl="/register"
        fallbackRedirectUrl="/dashboard"
      />
    </main>
  )
}
