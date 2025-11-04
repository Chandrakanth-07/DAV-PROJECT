"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  BookOpen,
  Clock,
  Star,
  Play,
  CheckCircle,
  Lock,
  ChevronLeft,
  Download,
  Share,
  Heart,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"

interface CourseDetailPageProps {
  courseId: string
}

interface Lesson {
  id: string
  title: string
  duration: string
  type: "video" | "quiz" | "assignment" | "reading"
  completed: boolean
  locked: boolean
}

interface Module {
  id: string
  title: string
  lessons: Lesson[]
  completed: number
  total: number
}

const mockCourseData = {
  "math-algebra-2": {
    title: "Algebra II - Advanced Concepts",
    description:
      "Master quadratic functions, polynomials, and complex equations with interactive problem solving. This comprehensive course covers all essential topics needed for advanced mathematics.",
    instructor: {
      name: "Dr. Sarah Johnson",
      title: "Professor of Mathematics",
      rating: 4.8,
      students: 15420,
      bio: "Dr. Johnson has been teaching mathematics for over 15 years and specializes in making complex concepts accessible to students.",
    },
    duration: "12 weeks",
    lessons: 48,
    students: 1245,
    rating: 4.8,
    level: "Intermediate",
    category: "Mathematics",
    thumbnail: "/algebra-mathematics-equations.jpg",
    progress: 78,
    price: "Free",
    tags: ["Algebra", "Functions", "Equations"],
    modules: [
      {
        id: "module-1",
        title: "Introduction to Advanced Algebra",
        lessons: [
          {
            id: "1-1",
            title: "Review of Basic Algebra",
            duration: "15 min",
            type: "video" as const,
            completed: true,
            locked: false,
          },
          {
            id: "1-2",
            title: "Complex Numbers Introduction",
            duration: "20 min",
            type: "video" as const,
            completed: true,
            locked: false,
          },
          {
            id: "1-3",
            title: "Practice Quiz: Basics",
            duration: "10 min",
            type: "quiz" as const,
            completed: true,
            locked: false,
          },
          {
            id: "1-4",
            title: "Homework Assignment 1",
            duration: "30 min",
            type: "assignment" as const,
            completed: false,
            locked: false,
          },
        ],
        completed: 3,
        total: 4,
      },
      {
        id: "module-2",
        title: "Quadratic Functions",
        lessons: [
          {
            id: "2-1",
            title: "Understanding Quadratic Functions",
            duration: "25 min",
            type: "video" as const,
            completed: true,
            locked: false,
          },
          {
            id: "2-2",
            title: "Graphing Parabolas",
            duration: "30 min",
            type: "video" as const,
            completed: true,
            locked: false,
          },
          {
            id: "2-3",
            title: "Solving Quadratic Equations",
            duration: "35 min",
            type: "video" as const,
            completed: false,
            locked: false,
          },
          {
            id: "2-4",
            title: "Applications of Quadratics",
            duration: "20 min",
            type: "reading" as const,
            completed: false,
            locked: false,
          },
          {
            id: "2-5",
            title: "Quadratics Quiz",
            duration: "15 min",
            type: "quiz" as const,
            completed: false,
            locked: true,
          },
        ],
        completed: 2,
        total: 5,
      },
      {
        id: "module-3",
        title: "Polynomial Functions",
        lessons: [
          {
            id: "3-1",
            title: "Introduction to Polynomials",
            duration: "20 min",
            type: "video" as const,
            completed: false,
            locked: true,
          },
          {
            id: "3-2",
            title: "Polynomial Operations",
            duration: "25 min",
            type: "video" as const,
            completed: false,
            locked: true,
          },
          {
            id: "3-3",
            title: "Factoring Polynomials",
            duration: "30 min",
            type: "video" as const,
            completed: false,
            locked: true,
          },
        ],
        completed: 0,
        total: 3,
      },
    ],
  },
}

export function CourseDetailPage({ courseId }: CourseDetailPageProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const course = mockCourseData[courseId as keyof typeof mockCourseData]

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Course Not Found</h1>
          <p className="text-muted-foreground mb-4">The course you're looking for doesn't exist.</p>
          <Link href="/courses">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    )
  }

  const totalProgress = course.modules.reduce((acc, module) => acc + module.completed, 0)
  const totalLessons = course.modules.reduce((acc, module) => acc + module.total, 0)
  const progressPercentage = Math.round((totalProgress / totalLessons) * 100)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="px-6 py-4">
          <Link href="/courses" className="flex items-center gap-2 mb-4 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Courses</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Link href={`/courses/${courseId}/lesson/1-1`}>
                    <Button size="lg" className="rounded-full">
                      <Play className="mr-2 h-5 w-5" />
                      Start Learning
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-card-foreground mb-2">{course.title}</h1>
                  <p className="text-muted-foreground">{course.description}</p>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {course.rating} ({course.students.toLocaleString()} students)
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {course.lessons} lessons
                  </span>
                  <Badge variant="secondary">{course.level}</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Course Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span className="font-medium">{progressPercentage}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {totalProgress} of {totalLessons} lessons completed
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/courses/${courseId}/lesson/1-1`} className="flex-1">
                      <Button className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        Continue
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {course.instructor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{course.instructor.name}</h3>
                      <p className="text-sm text-muted-foreground">{course.instructor.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {course.instructor.rating}
                        </span>
                        <span>{course.instructor.students.toLocaleString()} students</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">{course.instructor.bio}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </header>

      {/* Course Content */}
      <main className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>What You'll Learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Master quadratic functions and their applications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Solve complex polynomial equations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Understand exponential and logarithmic functions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Apply algebraic concepts to real-world problems</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Course Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Completion of Algebra I or equivalent</li>
                      <li>• Basic understanding of linear equations</li>
                      <li>• Access to a calculator (scientific calculator recommended)</li>
                      <li>• Commitment to practice problems regularly</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Students Enrolled</span>
                      <span className="font-medium">{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Average Rating</span>
                      <span className="font-medium">{course.rating}/5.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Completion Rate</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Certificate</span>
                      <span className="font-medium">Available</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="curriculum" className="mt-6">
            <div className="space-y-4">
              {course.modules.map((module, index) => (
                <Card key={module.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        Module {index + 1}: {module.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {module.completed}/{module.total} completed
                        </span>
                        <Progress value={(module.completed / module.total) * 100} className="w-20 h-2" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {module.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className={`flex items-center justify-between p-3 rounded-lg border ${
                            lesson.locked ? "bg-muted/50" : "bg-accent hover:bg-accent/80"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {lesson.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : lesson.locked ? (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Play className="h-4 w-4 text-primary" />
                            )}
                            <div>
                              <p className={`font-medium ${lesson.locked ? "text-muted-foreground" : ""}`}>
                                {lesson.title}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{lesson.type}</span>
                                <span>•</span>
                                <span>{lesson.duration}</span>
                              </div>
                            </div>
                          </div>
                          {!lesson.locked && (
                            <Link href={`/courses/${courseId}/lesson/${lesson.id}`}>
                              <Button variant="ghost" size="sm">
                                {lesson.completed ? "Review" : "Start"}
                              </Button>
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Reviews</CardTitle>
                <p className="text-sm text-muted-foreground">See what other students are saying about this course</p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Reviews feature coming soon!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Resources</CardTitle>
                <p className="text-sm text-muted-foreground">Additional materials to support your learning</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent">
                    <div className="flex items-center gap-3">
                      <Download className="h-4 w-4" />
                      <span>Course Syllabus</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent">
                    <div className="flex items-center gap-3">
                      <Download className="h-4 w-4" />
                      <span>Formula Reference Sheet</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent">
                    <div className="flex items-center gap-3">
                      <Download className="h-4 w-4" />
                      <span>Practice Problem Sets</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
