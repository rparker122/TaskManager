import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import type { CreateTaskRequest } from "@/lib/types"

// GET /api/tasks - Get all tasks for authenticated user
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: tasks, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Get tasks error:", error)
      return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
    }

    return NextResponse.json({ tasks })
  } catch (error) {
    console.error("Get tasks error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/tasks - Create a new task
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body: CreateTaskRequest = await request.json()
    const { title, description, priority, dueDate } = body

    // Validate input
    if (!title || !priority) {
      return NextResponse.json({ error: "Title and priority are required" }, { status: 400 })
    }

    if (!["low", "medium", "high"].includes(priority)) {
      return NextResponse.json({ error: "Priority must be low, medium, or high" }, { status: 400 })
    }

    const { data: task, error } = await supabase
      .from("tasks")
      .insert({
        title,
        description,
        completed: false,
        priority,
        due_date: dueDate ? new Date(dueDate).toISOString() : null,
        user_id: user.id,
      })
      .select()
      .single()

    if (error) {
      console.error("Create task error:", error)
      return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
    }

    return NextResponse.json({ task }, { status: 201 })
  } catch (error) {
    console.error("Create task error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
