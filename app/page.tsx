"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckSquare, Calendar, Flag, Users } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (user) {
    return null // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <CheckSquare className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">TaskManager</h1>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-balance">
            Organize Your Work, <span className="text-primary">Achieve Your Goals</span>
          </h2>

          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            A powerful task management app that helps you stay organized with priorities, due dates, and seamless
            collaboration. Built with modern technology for maximum productivity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button size="lg" onClick={() => router.push("/auth")} className="text-lg px-8">
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => router.push("/auth")} className="text-lg px-8">
              Sign In
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-24 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <Flag className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Priority Management</CardTitle>
              <CardDescription>
                Organize tasks by priority levels (low, medium, high) with color-coded badges for quick identification.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Calendar className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Due Date Tracking</CardTitle>
              <CardDescription>
                Set due dates for your tasks and get visual indicators for overdue items to stay on track.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CheckSquare className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Task Management</CardTitle>
              <CardDescription>
                Create, edit, delete, and mark tasks as complete with a clean and intuitive interface.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>User Authentication</CardTitle>
              <CardDescription>
                Secure login system ensures your tasks are private and accessible only to you.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center mb-2">
                <span className="text-primary-foreground font-bold text-sm">⚡</span>
              </div>
              <CardTitle>Real-time Updates</CardTitle>
              <CardDescription>
                Changes are saved instantly and reflected across your dashboard in real-time.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center mb-2">
                <span className="text-primary-foreground font-bold text-sm">🔍</span>
              </div>
              <CardTitle>Search & Filter</CardTitle>
              <CardDescription>
                Quickly find tasks with powerful search and filtering options by status, priority, and more.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Demo Account Info */}
        <div className="mt-16 max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Try the Demo</CardTitle>
              <CardDescription className="text-center">
                Use these credentials to explore the app with sample data
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <p>
                <strong>Email:</strong> demo@example.com
              </p>
              <p>
                <strong>Password:</strong> password123
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
