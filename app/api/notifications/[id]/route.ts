export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const userId = localStorage.getItem("userId") || "guest"
  const notifications = JSON.parse(localStorage.getItem(`notifications-${userId}`) || "[]")

  const filteredNotifications = notifications.filter((n: any) => n.id !== params.id)

  localStorage.setItem(`notifications-${userId}`, JSON.stringify(filteredNotifications))

  return Response.json({ success: true })
}
