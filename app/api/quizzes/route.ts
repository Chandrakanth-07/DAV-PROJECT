import { mockQuizzes } from "@/lib/mock-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const videoId = searchParams.get("videoId")
  const subject = searchParams.get("subject")

  let quizzes = mockQuizzes

  if (videoId) {
    quizzes = quizzes.filter((q) => q.videoId === videoId)
  }

  if (subject) {
    quizzes = quizzes.filter((q) => q.subject.toLowerCase() === subject.toLowerCase())
  }

  return Response.json(quizzes)
}
