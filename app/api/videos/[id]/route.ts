import { mockVideos } from "@/lib/mock-data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const video = mockVideos.find((v) => v.id === params.id)

  if (!video) {
    return Response.json({ error: "Video not found" }, { status: 404 })
  }

  return Response.json(video)
}
