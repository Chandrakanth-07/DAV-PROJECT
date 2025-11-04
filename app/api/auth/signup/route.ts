import { type NextRequest, NextResponse } from "next/server"

// Mock user database (in real app, use MySQL/database)
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
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
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 })
    }

    // Check if user already exists (in real app, query MySQL database)
    const existingUser = mockUsers.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Create new user (in real app, hash password and save to MySQL)
    const newUser = {
      id: mockUsers.length + 1,
      name,
      email,
      password, // In real app, hash this password
      grade: "", // Will be set during onboarding
      subjects: [], // Will be set during onboarding
    }

    mockUsers.push(newUser)

    // Return user data (in real app, return JWT token)
    const { password: _, ...userWithoutPassword } = newUser
    return NextResponse.json({
      message: "Account created successfully",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
