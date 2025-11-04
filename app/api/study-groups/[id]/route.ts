import { mockStudyGroups } from "@/lib/mock-data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const groups = JSON.parse(localStorage.getItem("studyGroups") || "[]")
  let group = groups.find((g: any) => g.id === params.id)

  if (!group) {
    group = mockStudyGroups.find((g) => g.id === params.id)
  }

  if (!group) {
    return Response.json({ error: "Study group not found" }, { status: 404 })
  }

  return Response.json(group)
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const userId = localStorage.getItem("userId") || "guest"

  const groups = JSON.parse(localStorage.getItem("studyGroups") || "[]")
  const groupIndex = groups.findIndex((g: any) => g.id === params.id)

  if (groupIndex === -1) {
    return Response.json({ error: "Study group not found" }, { status: 404 })
  }

  if (body.action === "join") {
    if (!groups[groupIndex].members.includes(userId)) {
      groups[groupIndex].members.push(userId)
    }
  } else if (body.action === "leave") {
    groups[groupIndex].members = groups[groupIndex].members.filter((m: string) => m !== userId)
  }

  localStorage.setItem("studyGroups", JSON.stringify(groups))
  return Response.json(groups[groupIndex])
}
