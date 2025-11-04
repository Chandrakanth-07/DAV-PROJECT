import { type NextRequest, NextResponse } from "next/server"

// Mock user database (in real app, use MySQL/database)
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // In real app, this would be hashed
    grade: "10th",
    subjects: ["Mathematics", "Physics", "Chemistry"],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    grade: "12th",
    subjects: ["Biology", "Chemistry", "English"],
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user (in real app, query MySQL database)
    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Return user data (in real app, return JWT token)
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json({
      message: "Login successful",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
