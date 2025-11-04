import { mockPracticeTests } from "@/lib/mock-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const subject = searchParams.get("subject")
  const difficulty = searchParams.get("difficulty")

  let tests = mockPracticeTests

  if (subject) {
    tests = tests.filter((t) => t.subject.toLowerCase() === subject.toLowerCase())
  }

  if (difficulty) {
    tests = tests.filter((t) => t.difficulty === difficulty)
  }

  return Response.json(tests)
}
