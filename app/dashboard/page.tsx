"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { TaskList } from "@/components/tasks/task-list"
import { Header } from "@/components/layout/header"
import { useAuth } from "@/hooks/use-auth"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <TaskList />
      </main>
    </div>
  )
}
