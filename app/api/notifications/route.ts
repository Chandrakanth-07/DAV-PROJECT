export async function GET(request: Request) {
  const userId = localStorage.getItem("userId") || "guest"
  const notifications = JSON.parse(localStorage.getItem(`notifications-${userId}`) || "[]")

  // Sort by date, newest first
  notifications.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const unreadCount = notifications.filter((n: any) => !n.read).length

  return Response.json({
    notifications,
    unreadCount,
    total: notifications.length,
  })
}

export async function POST(request: Request) {
  const userId = localStorage.getItem("userId") || "guest"
  const body = await request.json()

  const notifications = JSON.parse(localStorage.getItem(`notifications-${userId}`) || "[]")

  const newNotification = {
    id: Date.now().toString(),
    userId,
    type: body.type, // 'quiz', 'achievement', 'reminder', 'doubt', 'study_group'
    title: body.title,
    message: body.message,
    icon: body.icon,
    actionUrl: body.actionUrl,
    read: false,
    createdAt: new Date().toISOString(),
  }

  notifications.push(newNotification)
  localStorage.setItem(`notifications-${userId}`, JSON.stringify(notifications))

  return Response.json(newNotification, { status: 201 })
}

export async function PUT(request: Request) {
  const userId = localStorage.getItem("userId") || "guest"
  const body = await request.json()

  const notifications = JSON.parse(localStorage.getItem(`notifications-${userId}`) || "[]")

  if (body.markAllAsRead) {
    notifications.forEach((n: any) => {
      n.read = true
    })
  } else if (body.notificationId) {
    const notification = notifications.find((n: any) => n.id === body.notificationId)
    if (notification) {
      notification.read = true
    }
  }

  localStorage.setItem(`notifications-${userId}`, JSON.stringify(notifications))

  return Response.json({ success: true })
}
