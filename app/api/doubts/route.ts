import { mockDoubts } from "@/lib/mock-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const subject = searchParams.get("subject")
  const status = searchParams.get("status")

  let doubts = mockDoubts

  if (subject) {
    doubts = doubts.filter((d) => d.subject.toLowerCase() === subject.toLowerCase())
  }

  if (status) {
    doubts = doubts.filter((d) => d.status === status)
  }

  return Response.json(doubts)
}

export async function POST(request: Request) {
  const body = await request.json()
  const userId = localStorage.getItem("userId") || "guest"
  const userName = localStorage.getItem("userName") || "Anonymous"

  const newDoubt = {
    id: `doubt-${Date.now()}`,
    userId,
    userName,
    subject: body.subject,
    title: body.title,
    description: body.description,
    createdAt: new Date().toISOString(),
    responses: [],
    status: "open" as const,
    views: 0,
  }

  // Save to localStorage
  const doubts = JSON.parse(localStorage.getItem("doubts") || "[]")
  doubts.push(newDoubt)
  localStorage.setItem("doubts", JSON.stringify(doubts))

  return Response.json(newDoubt, { status: 201 })
}
