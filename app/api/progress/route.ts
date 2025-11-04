export async function GET(request: Request) {
  const userId = localStorage.getItem("userId") || "guest"

  const videoProgress = JSON.parse(localStorage.getItem(`progress-${userId}`) || "[]")
  const quizResults = JSON.parse(localStorage.getItem("quizResults") || "[]").filter((r: any) => r.userId === userId)
  const testResults = JSON.parse(localStorage.getItem("practiceTestResults") || "[]").filter(
    (r: any) => r.userId === userId,
  )

  return Response.json({
    videoProgress,
    quizResults,
    testResults,
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  const userId = localStorage.getItem("userId") || "guest"

  const progress = JSON.parse(localStorage.getItem(`progress-${userId}`) || "[]")
  const existingProgress = progress.find((p: any) => p.videoId === body.videoId)

  if (existingProgress) {
    existingProgress.watchedDuration = body.watchedDuration
    existingProgress.completed = body.completed
    if (body.completed) {
      existingProgress.completedAt = new Date().toISOString()
    }
  } else {
    progress.push({
      userId,
      videoId: body.videoId,
      completed: body.completed,
      watchedDuration: body.watchedDuration,
      totalDuration: body.totalDuration,
      completedAt: body.completed ? new Date().toISOString() : undefined,
    })
  }

  localStorage.setItem(`progress-${userId}`, JSON.stringify(progress))
  return Response.json({ success: true })
}
