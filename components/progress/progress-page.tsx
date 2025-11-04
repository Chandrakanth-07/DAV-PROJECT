"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Clock, Target, Star, ChevronLeft, Trophy, Flame, Brain, CheckCircle } from "lucide-react"
import { useAuth } from "@/components/auth-guard"
import Link from "next/link"

const weeklyStudyData = [
  { day: "Mon", hours: 2.5, target: 3 },
  { day: "Tue", hours: 3.2, target: 3 },
  { day: "Wed", hours: 1.8, target: 3 },
  { day: "Thu", hours: 4.1, target: 3 },
  { day: "Fri", hours: 2.9, target: 3 },
  { day: "Sat", hours: 3.5, target: 3 },
  { day: "Sun", hours: 2.1, target: 3 },
]

const monthlyProgressData = [
  { month: "Jan", completed: 12, started: 15 },
  { month: "Feb", completed: 18, started: 20 },
  { month: "Mar", completed: 22, started: 25 },
  { month: "Apr", completed: 28, started: 30 },
  { month: "May", completed: 35, started: 38 },
  { month: "Jun", completed: 42, started: 45 },
]

const subjectPerformanceData = [
  { subject: "Mathematics", score: 87, lessons: 24, color: "#3b82f6" },
  { subject: "Physics", score: 82, lessons: 18, color: "#06b6d4" },
  { subject: "Chemistry", score: 91, lessons: 22, color: "#10b981" },
  { subject: "Biology", score: 78, lessons: 16, color: "#f59e0b" },
  { subject: "English", score: 85, lessons: 20, color: "#8b5cf6" },
]

const achievementData = [
  { name: "Completed", value: 68, color: "#10b981" },
  { name: "In Progress", value: 25, color: "#3b82f6" },
  { name: "Not Started", value: 7, color: "#6b7280" },
]

export function ProgressPage() {
  const { user } = useAuth()
  const [timeRange, setTimeRange] = useState("week")
  const [selectedSubject, setSelectedSubject] = useState("all")

  const totalStudyHours = weeklyStudyData.reduce((acc, day) => acc + day.hours, 0)
  const averageScore = Math.round(
    subjectPerformanceData.reduce((acc, subject) => acc + subject.score, 0) / subjectPerformanceData.length,
  )
  const completedLessons = subjectPerformanceData.reduce((acc, subject) => acc + subject.lessons, 0)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-sidebar-border">
        <div className="p-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 mb-8 text-sidebar-foreground hover:text-sidebar-primary"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="h-8 w-8 text-sidebar-primary" />
            <h1 className="text-xl font-semibold text-sidebar-foreground">Progress</h1>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-sidebar-foreground mb-3">Time Range</h3>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="text-sm font-medium text-sidebar-foreground mb-3">Subject Filter</h3>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-semibold text-card-foreground">Learning Progress</h1>
                <p className="text-sm text-muted-foreground">Track your learning journey and achievements</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Flame className="h-3 w-3" />7 day streak
                </Badge>
                <Badge variant="outline">Level 12</Badge>
              </div>
            </div>
          </div>
        </header>

        {/* Progress Content */}
        <main className="flex-1 p-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Study Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">{totalStudyHours.toFixed(1)}h</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-chart-1" />
                  <span className="text-chart-1">+15% this week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Average Score</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">{averageScore}%</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-chart-2" />
                  <span className="text-chart-2">+3% this week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Lessons Completed</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">{completedLessons}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="text-chart-3">This month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Learning Streak</CardTitle>
                <Flame className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">7 days</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Trophy className="mr-1 h-3 w-3 text-chart-4" />
                  <span className="text-chart-4">Personal best!</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-md">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Weekly Study Hours */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Weekly Study Hours</CardTitle>
                    <p className="text-sm text-muted-foreground">Your daily study time vs target</p>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={weeklyStudyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="hours" fill="#3b82f6" name="Study Hours" />
                        <Bar dataKey="target" fill="#e5e7eb" name="Target" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Monthly Progress */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Monthly Progress</CardTitle>
                    <p className="text-sm text-muted-foreground">Lessons completed over time</p>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={monthlyProgressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} name="Completed" />
                        <Line type="monotone" dataKey="started" stroke="#3b82f6" strokeWidth={2} name="Started" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Learning Streaks */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Learning Streaks & Milestones</CardTitle>
                  <p className="text-sm text-muted-foreground">Your consistency and achievements</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 rounded-lg bg-accent">
                      <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-accent-foreground">7</div>
                      <p className="text-sm text-muted-foreground">Current Streak</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-accent">
                      <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-accent-foreground">15</div>
                      <p className="text-sm text-muted-foreground">Longest Streak</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-accent">
                      <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-accent-foreground">89%</div>
                      <p className="text-sm text-muted-foreground">Goal Achievement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subjects" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Subject Performance */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Subject Performance</CardTitle>
                    <p className="text-sm text-muted-foreground">Your average scores by subject</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {subjectPerformanceData.map((subject) => (
                        <div key={subject.subject} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-card-foreground">{subject.subject}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">{subject.lessons} lessons</span>
                              <span className="text-sm font-medium">{subject.score}%</span>
                            </div>
                          </div>
                          <Progress value={subject.score} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Course Completion */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Course Completion</CardTitle>
                    <p className="text-sm text-muted-foreground">Overall progress distribution</p>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={achievementData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {achievementData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4 mt-4">
                      {achievementData.map((entry) => (
                        <div key={entry.name} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                          <span className="text-sm text-muted-foreground">
                            {entry.name} ({entry.value}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      Academic Excellence
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 rounded bg-accent">
                        <span className="text-sm">Perfect Score</span>
                        <Badge variant="secondary">3x</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-accent">
                        <span className="text-sm">A+ Average</span>
                        <Badge variant="secondary">2x</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-accent">
                        <span className="text-sm">Top 10%</span>
                        <Badge variant="secondary">5x</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Flame className="h-5 w-5 text-orange-500" />
                      Consistency
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 rounded bg-accent">
                        <span className="text-sm">7 Day Streak</span>
                        <Badge variant="default">Current</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-accent">
                        <span className="text-sm">30 Day Streak</span>
                        <Badge variant="outline">Achieved</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-accent">
                        <span className="text-sm">Early Bird</span>
                        <Badge variant="secondary">12x</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Brain className="h-5 w-5 text-purple-500" />
                      Learning Milestones
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 rounded bg-accent">
                        <span className="text-sm">100 Lessons</span>
                        <Badge variant="default">Achieved</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-accent">
                        <span className="text-sm">50 Quizzes</span>
                        <Badge variant="default">Achieved</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-accent">
                        <span className="text-sm">10 Courses</span>
                        <Badge variant="secondary">8/10</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="goals" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Weekly Goals</CardTitle>
                    <p className="text-sm text-muted-foreground">Track your weekly learning targets</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Study 15 hours</span>
                          <span className="text-sm text-muted-foreground">12.5/15h</span>
                        </div>
                        <Progress value={83} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Complete 10 lessons</span>
                          <span className="text-sm text-muted-foreground">8/10</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Take 5 quizzes</span>
                          <span className="text-sm text-muted-foreground">5/5</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Maintain streak</span>
                          <span className="text-sm text-muted-foreground">7/7 days</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Monthly Goals</CardTitle>
                    <p className="text-sm text-muted-foreground">Long-term learning objectives</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Complete 2 courses</span>
                          <span className="text-sm text-muted-foreground">1/2</span>
                        </div>
                        <Progress value={50} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Achieve 90% average</span>
                          <span className="text-sm text-muted-foreground">87%</span>
                        </div>
                        <Progress value={87} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Study 60 hours</span>
                          <span className="text-sm text-muted-foreground">45/60h</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Earn 5 certificates</span>
                          <span className="text-sm text-muted-foreground">3/5</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
