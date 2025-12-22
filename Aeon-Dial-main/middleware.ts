import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

// Routes that require authentication
const PROTECTED_ROUTES = [
  "/dashboard",
  "/leads",
  "/opportunities",
  "/campaigns",
  "/automations",
  "/settings",
  "/reports",
  "/agents",
  "/users",
  "/calendars",
]

// API routes that require auth (handled separately)
const PROTECTED_API_ROUTES = [
  "/api/leads",
  "/api/opportunities",
  "/api/campaigns",
]

// Routes that are always public
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/auth/callback",
  "/api/health",
]

async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  return { supabaseResponse, user }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // Always allow public routes
  if (PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(route + "/"))) {
    const { supabaseResponse } = await updateSession(request)
    return supabaseResponse
  }

  // Check if route requires auth
  const requiresAuth = PROTECTED_ROUTES.some(
    route => pathname === route || pathname.startsWith(route + "/")
  )

  // Check if API route requires auth
  const requiresApiAuth = PROTECTED_API_ROUTES.some(
    route => pathname === route || pathname.startsWith(route + "/")
  )

  if (requiresAuth) {
    const { supabaseResponse, user } = await updateSession(request)

    if (!user) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }

    return supabaseResponse
  }

  if (requiresApiAuth) {
    const { supabaseResponse, user } = await updateSession(request)

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized", code: "UNAUTHENTICATED" },
        { status: 401 }
      )
    }

    return supabaseResponse
  }

  // Default: update session and continue
  const { supabaseResponse } = await updateSession(request)
  return supabaseResponse
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
