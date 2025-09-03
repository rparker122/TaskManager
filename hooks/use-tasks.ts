"use client"

import { useState, useEffect } from "react"
import type { Task, CreateTaskRequest, UpdateTaskRequest } from "@/lib/types"

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTasks = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/tasks")

      if (!response.ok) {
        throw new Error("Failed to fetch tasks")
      }

      const data = await response.json()
      setTasks(data.tasks)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch tasks")
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (taskData: CreateTaskRequest): Promise<Task> => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to create task")
    }

    const data = await response.json()
    setTasks((prev) => [...prev, data.task])
    return data.task
  }

  const updateTask = async (id: string, updates: UpdateTaskRequest): Promise<Task> => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to update task")
    }

    const data = await response.json()
    setTasks((prev) => prev.map((task) => (task.id === id ? data.task : task)))
    return data.task
  }

  const deleteTask = async (id: string): Promise<void> => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to delete task")
    }

    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const toggleTaskComplete = async (id: string): Promise<void> => {
    const task = tasks.find((t) => t.id === id)
    if (!task) return

    await updateTask(id, { completed: !task.completed })
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
  }
}
