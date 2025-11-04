import { mockVideos } from "@/lib/mock-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const subject = searchParams.get("subject")
  const difficulty = searchParams.get("difficulty")

  let videos = mockVideos

  if (subject) {
    videos = videos.filter((v) => v.subject.toLowerCase() === subject.toLowerCase())
  }

  if (difficulty) {
    videos = videos.filter((v) => v.difficulty === difficulty)
  }

  return Response.json(videos)
}
