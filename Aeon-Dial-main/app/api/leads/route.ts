// ═══════════════════════════════════════════════════════════════════════════════
// AEON Dial Protected API - Leads
// Example of canonical auth-aware API pattern
// ═══════════════════════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { requireAuth, requirePermission, AuthError } from "@/lib/auth/context"

/**
 * GET /api/leads
 * List leads for authenticated user's org
 * 
 * CRITICAL: org_id is NEVER accepted from client
 * It is ALWAYS derived from authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Require authentication and get context
    const context = await requireAuth()
    
    // 2. Check permission
    requirePermission(context, "leads", "read")
    
    // 3. Get query params
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100)
    const status = searchParams.get("status")
    const assignedTo = searchParams.get("assigned_to")
    
    // 4. Build query - org_id comes from context, NOT from request
    const supabase = await createClient()
    let query = supabase
      .from("leads")
      .select("*", { count: "exact" })
      .eq("org_id", context.org.id) // ALWAYS use context.org.id
      .order("created_at", { ascending: false })
      .range((page - 1) * limit, page * limit - 1)
    
    // Apply filters
    if (status) {
      query = query.eq("status", status)
    }
    
    // Agents can only see their assigned leads (enforced by RLS too)
    if (context.user.role === "agent") {
      query = query.eq("assigned_to", context.user.id)
    } else if (assignedTo) {
      query = query.eq("assigned_to", assignedTo)
    }
    
    const { data: leads, error, count } = await query
    
    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch leads", details: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      data: leads,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (error) {
    if (error instanceof AuthError) {
      const status = error.code === "UNAUTHENTICATED" ? 401 : 403
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status }
      )
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * POST /api/leads
 * Create a new lead
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Require authentication
    const context = await requireAuth()
    
    // 2. Check permission
    requirePermission(context, "leads", "create")
    
    // 3. Parse body
    const body = await request.json()
    
    // 4. Validate required fields
    if (!body.email && !body.phone) {
      return NextResponse.json(
        { error: "Email or phone is required" },
        { status: 400 }
      )
    }
    
    // 5. Create lead - org_id comes from context, NOT from body
    const supabase = await createClient()
    const { data: lead, error } = await supabase
      .from("leads")
      .insert({
        org_id: context.org.id, // ALWAYS use context.org.id
        email: body.email,
        phone: body.phone,
        first_name: body.first_name,
        last_name: body.last_name,
        company: body.company,
        status: body.status || "new",
        source: body.source,
        assigned_to: body.assigned_to || context.user.id,
        metadata: body.metadata || {},
        created_by: context.user.id,
      })
      .select()
      .single()
    
    if (error) {
      return NextResponse.json(
        { error: "Failed to create lead", details: error.message },
        { status: 500 }
      )
    }
    
    // 6. Emit action event
    await supabase.from("actions").insert({
      org_id: context.org.id,
      user_id: context.user.id,
      action_type: "lead_created",
      entity_type: "lead",
      entity_id: lead.id,
      metadata: {
        email: lead.email,
        source: lead.source,
      },
    })
    
    // 7. Audit log
    await supabase.from("audit_logs").insert({
      org_id: context.org.id,
      actor_id: context.user.id,
      event_type: "lead_created",
      resource_type: "lead",
      resource_id: lead.id,
      metadata: {
        email: lead.email,
        assigned_to: lead.assigned_to,
      },
    })
    
    return NextResponse.json({ data: lead }, { status: 201 })
  } catch (error) {
    if (error instanceof AuthError) {
      const status = error.code === "UNAUTHENTICATED" ? 401 : 403
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status }
      )
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
