import { mockAchievements } from "@/lib/mock-data"

export async function GET(request: Request) {
  const userId = localStorage.getItem("userId") || "guest"

  // Get earned achievements from localStorage
  const earnedAchievements = JSON.parse(localStorage.getItem(`achievements-${userId}`) || "[]")

  // Combine mock achievements with earned status
  const achievements = mockAchievements.map((ach) => ({
    ...ach,
    earned: earnedAchievements.some((e: any) => e.id === ach.id),
  }))

  return Response.json(achievements)
}

export async function POST(request: Request) {
  const body = await request.json()
  const userId = localStorage.getItem("userId") || "guest"

  const earnedAchievements = JSON.parse(localStorage.getItem(`achievements-${userId}`) || "[]")

  const newAchievement = {
    id: body.id,
    earnedAt: new Date().toISOString(),
  }

  if (!earnedAchievements.some((e: any) => e.id === body.id)) {
    earnedAchievements.push(newAchievement)
    localStorage.setItem(`achievements-${userId}`, JSON.stringify(earnedAchievements))
  }

  return Response.json(newAchievement, { status: 201 })
}
