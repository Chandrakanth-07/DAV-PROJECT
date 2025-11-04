export async function GET(request: Request) {
  const userId = localStorage.getItem("userId") || "guest"

  const settings = JSON.parse(
    localStorage.getItem(`settings-${userId}`) ||
      JSON.stringify({
        userId,
        notificationsEnabled: true,
        emailNotifications: true,
        studyGoalHours: 15,
        preferredSubjects: ["Mathematics", "Physics"],
        theme: "light",
        language: "en",
      }),
  )

  return Response.json(settings)
}

export async function PUT(request: Request) {
  const body = await request.json()
  const userId = localStorage.getItem("userId") || "guest"

  const settings = {
    userId,
    ...body,
  }

  localStorage.setItem(`settings-${userId}`, JSON.stringify(settings))
  return Response.json(settings)
}
