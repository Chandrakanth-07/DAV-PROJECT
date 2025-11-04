import { mockStudyGroups } from "@/lib/mock-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const subject = searchParams.get("subject")

  let groups = mockStudyGroups

  if (subject) {
    groups = groups.filter((g) => g.subject.toLowerCase() === subject.toLowerCase())
  }

  return Response.json(groups)
}

export async function POST(request: Request) {
  const body = await request.json()
  const userId = localStorage.getItem("userId") || "guest"

  const newGroup = {
    id: `group-${Date.now()}`,
    name: body.name,
    subject: body.subject,
    description: body.description,
    members: [userId],
    createdBy: userId,
    createdAt: new Date().toISOString().split("T")[0],
    maxMembers: body.maxMembers || 10,
    status: "active" as const,
  }

  // Save to localStorage
  const groups = JSON.parse(localStorage.getItem("studyGroups") || "[]")
  groups.push(newGroup)
  localStorage.setItem("studyGroups", JSON.stringify(groups))

  return Response.json(newGroup, { status: 201 })
}
