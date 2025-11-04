import { mockPracticeTests } from "@/lib/mock-data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const test = mockPracticeTests.find((t) => t.id === params.id)

  if (!test) {
    return Response.json({ error: "Practice test not found" }, { status: 404 })
  }

  return Response.json(test)
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const test = mockPracticeTests.find((t) => t.id === params.id)

  if (!test) {
    return Response.json({ error: "Practice test not found" }, { status: 404 })
  }

  // Calculate score
  let totalMarks = 0
  let obtainedMarks = 0
  const answers = body.answers || []

  test.questions.forEach((question, index) => {
    totalMarks += question.marks
    if (answers[index] === question.correctAnswer) {
      obtainedMarks += question.marks
    }
  })

  const percentage = (obtainedMarks / totalMarks) * 100

  // Save result to localStorage
  const userId = localStorage.getItem("userId") || "guest"
  const results = JSON.parse(localStorage.getItem("practiceTestResults") || "[]")
  results.push({
    userId,
    testId: params.id,
    obtainedMarks,
    totalMarks,
    percentage,
    completedAt: new Date().toISOString(),
    answers,
  })
  localStorage.setItem("practiceTestResults", JSON.stringify(results))

  return Response.json({
    obtainedMarks,
    totalMarks,
    percentage,
  })
}
