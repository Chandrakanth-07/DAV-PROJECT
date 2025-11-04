import { mockQuizzes } from "@/lib/mock-data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const quiz = mockQuizzes.find((q) => q.id === params.id)

  if (!quiz) {
    return Response.json({ error: "Quiz not found" }, { status: 404 })
  }

  return Response.json(quiz)
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const quiz = mockQuizzes.find((q) => q.id === params.id)

  if (!quiz) {
    return Response.json({ error: "Quiz not found" }, { status: 404 })
  }

  // Calculate score
  let score = 0
  const answers = body.answers || []

  quiz.questions.forEach((question, index) => {
    if (answers[index] === question.correctAnswer) {
      score++
    }
  })

  const totalScore = quiz.questions.length
  const percentage = (score / totalScore) * 100
  const passed = percentage >= quiz.passingScore

  // Save result to localStorage
  const userId = localStorage.getItem("userId") || "guest"
  const results = JSON.parse(localStorage.getItem("quizResults") || "[]")
  results.push({
    userId,
    quizId: params.id,
    score,
    totalScore,
    percentage,
    passed,
    completedAt: new Date().toISOString(),
    answers,
  })
  localStorage.setItem("quizResults", JSON.stringify(results))

  return Response.json({
    score,
    totalScore,
    percentage,
    passed,
    passingScore: quiz.passingScore,
  })
}
