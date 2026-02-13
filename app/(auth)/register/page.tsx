import { SignUp } from "@clerk/nextjs"

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
      <SignUp
        path="/register"
        routing="path"
        signInUrl="/"
        fallbackRedirectUrl="/dashboard"
      />
    </main>
  )
}
