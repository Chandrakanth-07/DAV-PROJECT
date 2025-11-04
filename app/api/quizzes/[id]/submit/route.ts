export async function POST(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const userId = localStorage.getItem("userId") || "guest"

  // Calculate score
  const score = body.answers.reduce((acc: number, answer: number, index: number) => {
    return answer === body.correctAnswers[index] ? acc + 1 : acc
  }, 0)

  const totalScore = body.correctAnswers.length
  const percentage = Math.round((score / totalScore) * 100)
  const passed = percentage >= 70

  // Save quiz result
  const quizResults = JSON.parse(localStorage.getItem("quizResults") || "[]")
  quizResults.push({
    userId,
    quizId: params.id,
    score: percentage,
    totalScore: 100,
    passed,
    completedAt: new Date().toISOString(),
    answers: body.answers,
  })

  localStorage.setItem("quizResults", JSON.stringify(quizResults))

  const history = JSON.parse(localStorage.getItem(`history-${userId}`) || "[]")
  history.push({
    id: `history-${Date.now()}`,
    userId,
    type: "quiz",
    action: "attempted",
    title: body.quizTitle || "Quiz",
    description: `${passed ? "Passed" : "Attempted"} quiz with ${percentage}% score`,
    subject: body.subject || "General",
    score: percentage,
    timestamp: new Date().toISOString(),
    metadata: { quizId: params.id, passed },
  })
  localStorage.setItem(`history-${userId}`, JSON.stringify(history))

  const notificationMessage = passed
    ? `Great job! You scored ${percentage}% on the quiz!`
    : `You scored ${percentage}% on the quiz. Keep practicing!`

  const notifications = JSON.parse(localStorage.getItem(`notifications-${userId}`) || "[]")
  notifications.push({
    id: Date.now().toString(),
    userId,
    type: "quiz",
    title: "Quiz Completed",
    message: notificationMessage,
    icon: "📝",
    actionUrl: "/progress",
    read: false,
    createdAt: new Date().toISOString(),
  })
  localStorage.setItem(`notifications-${userId}`, JSON.stringify(notifications))

  // Check if achievement should be unlocked
  const allResults = quizResults.filter((r: any) => r.userId === userId)
  const averageScore = Math.round(allResults.reduce((acc: number, r: any) => acc + r.score, 0) / allResults.length)

  if (averageScore >= 90) {
    const achievements = JSON.parse(localStorage.getItem(`achievements-${userId}`) || "[]")
    if (!achievements.some((a: any) => a.id === "ach-2")) {
      achievements.push({
        id: "ach-2",
        earnedAt: new Date().toISOString(),
      })
      localStorage.setItem(`achievements-${userId}`, JSON.stringify(achievements))

      const achievementNotifications = JSON.parse(localStorage.getItem(`notifications-${userId}`) || "[]")
      achievementNotifications.push({
        id: Date.now().toString(),
        userId,
        type: "achievement",
        title: "Achievement Unlocked!",
        message: "Quiz Master - Achieved 90% average score!",
        icon: "🏆",
        actionUrl: "/achievements",
        read: false,
        createdAt: new Date().toISOString(),
      })
      localStorage.setItem(`notifications-${userId}`, JSON.stringify(achievementNotifications))
    }
  }

  return Response.json({
    success: true,
    score: percentage,
    passed,
    totalScore,
  })
}
