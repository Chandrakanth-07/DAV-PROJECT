"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoPlayer } from "@/components/interactive/video-player"
import { QuizComponent } from "@/components/interactive/quiz-component"
import { InteractiveExercise } from "@/components/interactive/interactive-exercise"
import { NotesComponent } from "@/components/interactive/notes-component"
import { ChevronLeft, ChevronRight, MessageCircle, CheckCircle, Clock, Target } from "lucide-react"
import Link from "next/link"

interface LessonPageProps {
  courseId: string
  lessonId: string
}

const mockLessonData = {
  "1-1": {
    title: "Review of Basic Algebra",
    type: "video",
    duration: "15 min",
    description:
      "A comprehensive review of fundamental algebraic concepts including variables, expressions, and basic operations.",
    videoUrl: "/placeholder-video.mp4",
    transcript: "Welcome to our review of basic algebra. In this lesson, we'll cover the fundamental concepts...",
    keyPoints: [
      "Understanding variables and constants",
      "Basic algebraic operations",
      "Simplifying expressions",
      "Order of operations (PEMDAS)",
    ],
    nextLesson: "1-2",
    prevLesson: null,
  },
  "1-3": {
    title: "Practice Quiz: Basics",
    type: "quiz",
    duration: "10 min",
    description: "Test your understanding of basic algebra concepts with this interactive quiz.",
    questions: [
      {
        id: 1,
        question: "What is the value of x in the equation 2x + 5 = 13?",
        type: "multiple-choice",
        options: ["x = 3", "x = 4", "x = 5", "x = 6"],
        correct: 1,
        explanation: "To solve 2x + 5 = 13, subtract 5 from both sides: 2x = 8, then divide by 2: x = 4",
      },
      {
        id: 2,
        question: "Simplify the expression: 3x + 2x - x",
        type: "multiple-choice",
        options: ["4x", "5x", "6x", "2x"],
        correct: 0,
        explanation: "Combine like terms: 3x + 2x - x = (3 + 2 - 1)x = 4x",
      },
      {
        id: 3,
        question: "What is the coefficient of x in the expression 7x + 3?",
        type: "input",
        correct: "7",
        explanation: "The coefficient is the number multiplied by the variable, which is 7.",
      },
    ],
    nextLesson: "1-4",
    prevLesson: "1-2",
  },
  "2-1": {
    title: "Understanding Quadratic Functions",
    type: "interactive",
    duration: "25 min",
    description: "Explore quadratic functions through interactive graphs and real-world applications.",
    content: {
      type: "graphing",
      function: "y = ax² + bx + c",
      parameters: { a: 1, b: 0, c: 0 },
      exercises: [
        {
          instruction: "Adjust the value of 'a' and observe how it affects the parabola's shape",
          target: "Change a to 2, then to -1",
        },
        {
          instruction: "Set a=1, b=0, c=3. What happens to the graph?",
          target: "The parabola shifts up by 3 units",
        },
      ],
    },
    nextLesson: "2-2",
    prevLesson: "1-4",
  },
}

export function LessonPage({ courseId, lessonId }: LessonPageProps) {
  const [currentTab, setCurrentTab] = useState("content")
  const [lessonProgress, setLessonProgress] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [startTime] = useState(Date.now())
  const [timeSpent, setTimeSpent] = useState(0)

  const lesson = mockLessonData[lessonId as keyof typeof mockLessonData]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)

    return () => clearInterval(timer)
  }, [startTime])

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Lesson Not Found</h1>
          <p className="text-muted-foreground mb-4">The lesson you're looking for doesn't exist.</p>
          <Link href={`/courses/${courseId}`}>
            <Button>Back to Course</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleComplete = () => {
    setIsCompleted(true)
    setLessonProgress(100)
    // In real app, save progress to backend
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="px-6 py-4">
          <Link
            href={`/courses/${courseId}`}
            className="flex items-center gap-2 mb-4 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Course</span>
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-card-foreground">{lesson.title}</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {lesson.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  Time spent: {formatTime(timeSpent)}
                </span>
                <Badge variant={lesson.type === "video" ? "default" : lesson.type === "quiz" ? "secondary" : "outline"}>
                  {lesson.type}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isCompleted && (
                <Badge variant="default" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Completed
                </Badge>
              )}
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Progress</div>
                <div className="text-lg font-semibold">{lessonProgress}%</div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Progress value={lessonProgress} className="h-2" />
          </div>
        </div>
      </header>

      {/* Lesson Content */}
      <main className="flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="mt-6">
                <Card>
                  <CardContent className="p-0">
                    {lesson.type === "video" && (
                      <VideoPlayer
                        videoUrl={lesson.videoUrl}
                        onProgress={setLessonProgress}
                        onComplete={handleComplete}
                      />
                    )}
                    {lesson.type === "quiz" && (
                      <QuizComponent
                        questions={lesson.questions}
                        onProgress={setLessonProgress}
                        onComplete={handleComplete}
                      />
                    )}
                    {lesson.type === "interactive" && (
                      <InteractiveExercise
                        content={lesson.content}
                        onProgress={setLessonProgress}
                        onComplete={handleComplete}
                      />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="mt-6">
                <NotesComponent lessonId={lessonId} />
              </TabsContent>

              <TabsContent value="discussion" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Discussion
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Discussion feature coming soon!</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Lesson Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-accent">
                        <h4 className="font-medium">Lesson Transcript</h4>
                        <p className="text-sm text-muted-foreground mt-1">{lesson.transcript}</p>
                      </div>
                      {lesson.keyPoints && (
                        <div className="p-3 rounded-lg bg-accent">
                          <h4 className="font-medium">Key Points</h4>
                          <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                            {lesson.keyPoints.map((point, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lesson Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{lesson.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {lesson.prevLesson && (
                  <Link href={`/courses/${courseId}/lesson/${lesson.prevLesson}`}>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous Lesson
                    </Button>
                  </Link>
                )}
                {lesson.nextLesson && (
                  <Link href={`/courses/${courseId}/lesson/${lesson.nextLesson}`}>
                    <Button className="w-full justify-start" disabled={!isCompleted}>
                      Next Lesson
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
                {!isCompleted && (
                  <Button onClick={handleComplete} variant="secondary" className="w-full">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Complete
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
