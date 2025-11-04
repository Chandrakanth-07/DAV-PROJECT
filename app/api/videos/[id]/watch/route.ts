export async function POST(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const userId = localStorage.getItem("userId") || "guest"

  // Get current progress
  const progress = JSON.parse(localStorage.getItem(`progress-${userId}`) || "[]")
  let videoProgress = progress.find((p: any) => p.videoId === params.id)

  if (!videoProgress) {
    videoProgress = {
      userId,
      videoId: params.id,
      watchedDuration: 0,
      totalDuration: body.totalDuration,
      completed: false,
      completedAt: null,
    }
    progress.push(videoProgress)
  }

  // Update watched duration
  videoProgress.watchedDuration = body.watchedDuration

  const wasCompleted = videoProgress.completed
  if (body.watchedDuration >= body.totalDuration * 0.9) {
    videoProgress.completed = true
    videoProgress.completedAt = new Date().toISOString()

    // Create notification only on first completion
    if (!wasCompleted) {
      const notifications = JSON.parse(localStorage.getItem(`notifications-${userId}`) || "[]")
      notifications.push({
        id: Date.now().toString(),
        userId,
        type: "reminder",
        title: "Video Completed",
        message: `Great! You've completed the video. Take the quiz to test your knowledge!`,
        icon: "🎥",
        actionUrl: `/videos/${params.id}`,
        read: false,
        createdAt: new Date().toISOString(),
      })
      localStorage.setItem(`notifications-${userId}`, JSON.stringify(notifications))

      const history = JSON.parse(localStorage.getItem(`history-${userId}`) || "[]")
      history.push({
        id: `history-${Date.now()}`,
        userId,
        type: "video",
        action: "watched",
        title: body.videoTitle || "Video",
        description: `Completed watching video`,
        subject: body.subject || "General",
        duration: Math.round(body.totalDuration / 60),
        timestamp: new Date().toISOString(),
        metadata: { videoId: params.id },
      })
      localStorage.setItem(`history-${userId}`, JSON.stringify(history))
    }
  }

  localStorage.setItem(`progress-${userId}`, JSON.stringify(progress))

  return Response.json({
    success: true,
    progress: videoProgress,
  })
}
