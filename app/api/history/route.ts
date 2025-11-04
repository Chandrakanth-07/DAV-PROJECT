export async function GET(request: Request) {
  const userId = localStorage.getItem("userId") || "guest"
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type") // 'video', 'quiz', 'test', 'doubt', 'group'
  const limit = Number.parseInt(searchParams.get("limit") || "50")

  // Get all history from localStorage
  let history = JSON.parse(localStorage.getItem(`history-${userId}`) || "[]")

  // Filter by type if specified
  if (type) {
    history = history.filter((h: any) => h.type === type)
  }

  // Sort by date, newest first
  history.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  // Limit results
  history = history.slice(0, limit)

  return Response.json({
    history,
    total: history.length,
  })
}

export async function POST(request: Request) {
  const userId = localStorage.getItem("userId") || "guest"
  const body = await request.json()

  const history = JSON.parse(localStorage.getItem(`history-${userId}`) || "[]")

  const newHistoryEntry = {
    id: `history-${Date.now()}`,
    userId,
    type: body.type, // 'video', 'quiz', 'test', 'doubt', 'group'
    action: body.action, // 'watched', 'attempted', 'joined', 'posted', etc.
    title: body.title,
    description: body.description,
    subject: body.subject,
    score: body.score, // for quizzes/tests
    duration: body.duration, // for videos
    timestamp: new Date().toISOString(),
    metadata: body.metadata || {}, // additional data
  }

  history.push(newHistoryEntry)
  localStorage.setItem(`history-${userId}`, JSON.stringify(history))

  return Response.json(newHistoryEntry, { status: 201 })
}

export async function DELETE(request: Request) {
  const userId = localStorage.getItem("userId") || "guest"
  const body = await request.json()

  let history = JSON.parse(localStorage.getItem(`history-${userId}`) || "[]")

  if (body.clearAll) {
    // Clear all history
    history = []
  } else if (body.historyId) {
    // Delete specific entry
    history = history.filter((h: any) => h.id !== body.historyId)
  }

  localStorage.setItem(`history-${userId}`, JSON.stringify(history))

  return Response.json({ success: true })
}
