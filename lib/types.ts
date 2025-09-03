export interface User {
  id: string
  email: string
  password: string // In production, this would be hashed
  name: string
  createdAt: Date
}

export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: "low" | "medium" | "high"
  dueDate?: Date
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateTaskRequest {
  title: string
  description?: string
  priority: "low" | "medium" | "high"
  dueDate?: string
}

export interface UpdateTaskRequest {
  title?: string
  description?: string
  completed?: boolean
  priority?: "low" | "medium" | "high"
  dueDate?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  user: Omit<User, "password">
  token: string
}
