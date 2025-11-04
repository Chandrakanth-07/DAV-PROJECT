"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  BookOpen,
  Clock,
  Target,
  TrendingUp,
  Calendar,
  Play,
  CheckCircle,
  Star,
  Award,
  Settings,
  LogOut,
  ChevronRight,
  Brain,
  Users,
  MessageCircle,
  BarChart3,
} from "lucide-react"
import { useAuth } from "@/components/auth-guard"
import Link from "next/link"
import { NotificationBell } from "@/components/notification-bell"

interface User {
  id: number
  name: string
  email: string
  grade: string
  subjects: string[]
  onboardingComplete?: boolean
}

export function StudentDashboard() {
  const { user, logout } = useAuth()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [metrics, setMetrics] = useState({
    studyHoursThisWeek: 0,
    averageQuizScore: 0,
    currentStreak: 0,
    completedLessons: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch("/api/metrics")
        const data = await response.json()
        setMetrics({
          studyHoursThisWeek: data.studyHoursThisWeek || 0,
          averageQuizScore: data.averageQuizScore || 0,
          currentStreak: data.currentStreak || 0,
          completedLessons: data.completedLessons || 0,
        })
      } catch (error) {
        console.error("Failed to fetch metrics:", error)
      }
    }

    fetchMetrics()
    const interval = setInterval(fetchMetrics, 30000)
    return () => clearInterval(interval)
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // Mock data based on user profile
  const todaySchedule = [
    { time: "9:00 AM", subject: "Mathematics", type: "Live Class", status: "upcoming" },
    { time: "10:30 AM", subject: "Physics", type: "Practice Quiz", status: "completed" },
    { time: "2:00 PM", subject: "Chemistry", type: "Assignment Due", status: "pending" },
    { time: "4:00 PM", subject: "English", type: "Study Session", status: "upcoming" },
  ]

  const recentCourses = [
    { id: "math-algebra-2", name: "Algebra II", progress: 78, nextLesson: "Quadratic Functions", timeSpent: "2h 15m" },
    {
      id: "physics-mechanics",
      name: "Physics Mechanics",
      progress: 65,
      nextLesson: "Newton's Laws",
      timeSpent: "1h 45m",
    },
    {
      id: "chemistry-organic",
      name: "Organic Chemistry",
      progress: 82,
      nextLesson: "Molecular Structure",
      timeSpent: "3h 20m",
    },
  ]

  const achievements = [
    { title: "Math Streak", description: "7 days in a row", icon: "🔥" },
    { title: "Quiz Master", description: "90% average score", icon: "🏆" },
    { title: "Early Bird", description: "Completed morning lessons", icon: "🌅" },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-sidebar-border">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user ? getInitials(user.name) : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-sidebar-foreground">{user?.name || "Student"}</h2>
              <p className="text-xs text-sidebar-foreground/60">{user?.grade || "Grade"}</p>
            </div>
          </div>

          <nav className="space-y-2">
            <div className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider mb-3">Learning</div>
            <Button variant="ghost" className="w-full justify-start bg-sidebar-accent text-sidebar-accent-foreground">
              <BookOpen className="mr-3 h-4 w-4" />
              Dashboard
            </Button>
            <Link href="/courses" className="w-full">
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Play className="mr-3 h-4 w-4" />
                My Courses
              </Button>
            </Link>
            <Link href="/videos" className="w-full">
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Play className="mr-3 h-4 w-4" />
                Videos
              </Button>
            </Link>
            <Link href="/progress" className="w-full">
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <BarChart3 className="mr-3 h-4 w-4" />
                Progress
              </Button>
            </Link>
            <Link href="/practice-tests" className="w-full">
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Brain className="mr-3 h-4 w-4" />
                Practice Tests
              </Button>
            </Link>
            <Link href="/study-groups" className="w-full">
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Users className="mr-3 h-4 w-4" />
                Study Groups
              </Button>
            </Link>
            <Link href="/history" className="w-full">
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Clock className="mr-3 h-4 w-4" />
                History
              </Button>
            </Link>

            <div className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider mb-3 mt-6">
              Support
            </div>
            <Link href="/ask-doubts" className="w-full">
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <MessageCircle className="mr-3 h-4 w-4" />
                Ask Doubts
              </Button>
            </Link>
            <Link href="/achievements" className="w-full">
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Award className="mr-3 h-4 w-4" />
                Achievements
              </Button>
            </Link>

            <div className="pt-6 mt-6 border-t border-sidebar-border">
              <Link href="/settings" className="w-full">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Settings className="mr-3 h-4 w-4" />
                  Settings
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={logout}
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <LogOut className="mr-3 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-semibold text-card-foreground">
                {getGreeting()}, {user?.name?.split(" ")[0] || "Student"}!
              </h1>
              <p className="text-sm text-muted-foreground">Ready to continue your learning journey?</p>
            </div>
            <div className="flex items-center gap-3">
              <NotificationBell />
              <Badge variant="secondary">{currentTime.toLocaleDateString()}</Badge>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Study Streak</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">{metrics.currentStreak} days</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-chart-1" />
                  <span className="text-chart-1">Keep it up!</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Hours This Week</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">{metrics.studyHoursThisWeek.toFixed(1)}h</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="text-chart-2">Goal: 15h</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Avg. Quiz Score</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">{metrics.averageQuizScore}%</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="text-chart-3">
                    {metrics.averageQuizScore === 0 ? "Take your first quiz" : "Keep improving!"}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Completed Lessons</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">{metrics.completedLessons}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="text-chart-4">This month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Today's Schedule */}
            <Card className="lg:col-span-2 bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-card-foreground">Today's Schedule</CardTitle>
                  <p className="text-sm text-muted-foreground">{currentTime.toLocaleDateString()}</p>
                </div>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaySchedule.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent">
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-medium text-accent-foreground">{item.time}</div>
                        <div>
                          <p className="font-medium text-accent-foreground">{item.subject}</p>
                          <p className="text-xs text-muted-foreground">{item.type}</p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          item.status === "completed"
                            ? "default"
                            : item.status === "pending"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Recent Achievements</CardTitle>
                <p className="text-sm text-muted-foreground">Your latest milestones</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-accent">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <p className="font-medium text-accent-foreground">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Continue Learning */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Continue Learning</CardTitle>
              <p className="text-sm text-muted-foreground">Pick up where you left off</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentCourses.map((course, index) => (
                  <div key={index} className="p-4 rounded-lg bg-accent">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-accent-foreground">{course.name}</h3>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-accent-foreground">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Next: {course.nextLesson}</p>
                        <p className="text-xs text-muted-foreground">Time spent: {course.timeSpent}</p>
                      </div>
                      <Link href={`/courses/${course.id}`}>
                        <Button size="sm" className="w-full">
                          <Play className="mr-2 h-3 w-3" />
                          Continue
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
