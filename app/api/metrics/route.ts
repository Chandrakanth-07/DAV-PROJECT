export async function GET(request: Request) {
  const userId = localStorage.getItem("userId") || "guest"

  // Get video progress
  const videoProgress = JSON.parse(localStorage.getItem(`progress-${userId}`) || "[]")

  const studyHoursThisWeek = videoProgress.reduce((total: number, v: any) => {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const videoDate = new Date(v.completedAt || new Date())

    // Include all videos watched this week, regardless of completion status
    if (videoDate > weekAgo && v.watchedDuration > 0) {
      // Convert watched duration (in seconds) to hours
      return total + v.watchedDuration / 3600
    }
    return total
  }, 0)

  const videosWatchedThisWeek = videoProgress.filter((v: any) => {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const videoDate = new Date(v.completedAt || new Date())
    return videoDate > weekAgo && v.completed
  }).length

  // Get quiz results
  const quizResults = JSON.parse(localStorage.getItem("quizResults") || "[]").filter((r: any) => r.userId === userId)
  const quizzesTakenThisWeek = quizResults.filter((q: any) => {
    const completedDate = new Date(q.completedAt)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return completedDate > weekAgo
  }).length

  const averageQuizScore =
    quizResults.length > 0
      ? Math.round(quizResults.reduce((acc: number, q: any) => acc + q.score, 0) / quizResults.length)
      : 0

  const currentStreak = 7
  const longestStreak = 15
  const totalStudyHours = 87.5
  const completedLessons = 24

  return Response.json({
    userId,
    studyHoursThisWeek: Math.round(studyHoursThisWeek * 100) / 100, // Round to 2 decimal places
    averageQuizScore,
    videosWatchedThisWeek,
    quizzesTakenThisWeek,
    currentStreak,
    longestStreak,
    totalStudyHours,
    completedLessons,
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  const userId = localStorage.getItem("userId") || "guest"

  // Update video watch time
  if (body.videoId && body.watchedDuration) {
    const progress = JSON.parse(localStorage.getItem(`progress-${userId}`) || "[]")
    const videoProgress = progress.find((p: any) => p.videoId === body.videoId)

    if (videoProgress) {
      videoProgress.watchedDuration = body.watchedDuration
      if (body.watchedDuration >= body.totalDuration * 0.9) {
        videoProgress.completed = true
        videoProgress.completedAt = new Date().toISOString()
      }
    } else {
      progress.push({
        userId,
        videoId: body.videoId,
        watchedDuration: body.watchedDuration,
        totalDuration: body.totalDuration,
        completed: body.watchedDuration >= body.totalDuration * 0.9,
        completedAt: body.watchedDuration >= body.totalDuration * 0.9 ? new Date().toISOString() : undefined,
      })
    }

    localStorage.setItem(`progress-${userId}`, JSON.stringify(progress))
  }

  // Update quiz score
  if (body.quizId && body.score !== undefined) {
    const quizResults = JSON.parse(localStorage.getItem("quizResults") || "[]")
    quizResults.push({
      userId,
      quizId: body.quizId,
      score: body.score,
      totalScore: body.totalScore || 100,
      passed: body.score >= 70,
      completedAt: new Date().toISOString(),
    })
    localStorage.setItem("quizResults", JSON.stringify(quizResults))
  }

  return Response.json({ success: true })
}
