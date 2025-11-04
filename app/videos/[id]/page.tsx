"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QuizPlayer } from "@/components/quizzes/quiz-player"
import type { Video, Quiz } from "@/lib/mock-data"

export default function VideoPage({ params }: { params: { id: string } }) {
  const [video, setVideo] = useState<Video | null>(null)
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [loading, setLoading] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const watchTimeRef = useRef<number>(0)
  const trackingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoResponse = await fetch(`/api/videos/${params.id}`)
        const videoData = await videoResponse.json()
        setVideo(videoData)

        // Fetch associated quiz
        const quizResponse = await fetch(`/api/quizzes?videoId=${params.id}`)
        const quizzes = await quizResponse.json()
        if (quizzes.length > 0) {
          setQuiz(quizzes[0])
        }
      } catch (error) {
        console.error("Error fetching video:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideo()
  }, [params.id])

  useEffect(() => {
    if (!video) return

    // Start tracking watch time
    trackingIntervalRef.current = setInterval(async () => {
      watchTimeRef.current += 5 // Add 5 seconds every interval

      try {
        await fetch(`/api/videos/${params.id}/watch`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            watchedDuration: watchTimeRef.current,
            totalDuration: 600, // 10 minutes default
          }),
        })
      } catch (error) {
        console.error("Error tracking watch time:", error)
      }
    }, 5000) // Track every 5 seconds

    return () => {
      if (trackingIntervalRef.current) {
        clearInterval(trackingIntervalRef.current)
      }
    }
  }, [video, params.id])

  if (loading) {
    return <div className="text-center py-8">Loading video...</div>
  }

  if (!video) {
    return <div className="text-center py-8">Video not found</div>
  }

  if (showQuiz && quiz) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Button variant="outline" onClick={() => setShowQuiz(false)} className="mb-4">
            Back to Video
          </Button>
          <QuizPlayer quizId={quiz.id} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{video.title}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Badge>{video.subject}</Badge>
            <Badge variant="outline">{video.difficulty}</Badge>
            <span>{video.chapter}</span>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                ref={iframeRef}
                width="100%"
                height="100%"
                src={video.youtubeUrl}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About this video</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{video.description}</p>

            {quiz && (
              <Button onClick={() => setShowQuiz(true)} className="w-full">
                Take Quiz
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
