export async function GET(request: Request, { params }: { params: { id: string } }) {
  const doubts = JSON.parse(localStorage.getItem("doubts") || "[]")
  const doubt = doubts.find((d: any) => d.id === params.id)

  if (!doubt) {
    return Response.json({ error: "Doubt not found" }, { status: 404 })
  }

  // Increment views
  doubt.views = (doubt.views || 0) + 1
  localStorage.setItem("doubts", JSON.stringify(doubts))

  return Response.json(doubt)
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const userId = localStorage.getItem("userId") || "guest"
  const userName = localStorage.getItem("userName") || "Anonymous"

  const doubts = JSON.parse(localStorage.getItem("doubts") || "[]")
  const doubt = doubts.find((d: any) => d.id === params.id)

  if (!doubt) {
    return Response.json({ error: "Doubt not found" }, { status: 404 })
  }

  const newResponse = {
    id: `resp-${Date.now()}`,
    userId,
    userName,
    response: body.response,
    createdAt: new Date().toISOString(),
    helpful: 0,
    isAccepted: false,
  }

  doubt.responses.push(newResponse)
  localStorage.setItem("doubts", JSON.stringify(doubts))

  return Response.json(newResponse, { status: 201 })
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const doubts = JSON.parse(localStorage.getItem("doubts") || "[]")
  const doubt = doubts.find((d: any) => d.id === params.id)

  if (!doubt) {
    return Response.json({ error: "Doubt not found" }, { status: 404 })
  }

  if (body.status) {
    doubt.status = body.status
  }

  localStorage.setItem("doubts", JSON.stringify(doubts))
  return Response.json(doubt)
}
