"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, BookOpen, Brain, Users, BarChart3, Home } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  const features = [
    {
      title: "Videos Library",
      description: "Watch subject-wise educational videos from YouTube",
      icon: Play,
      url: "/videos",
      subjects: ["Math", "Physics", "Chemistry", "Biology"],
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Practice Tests",
      description: "Take full-length practice tests with instant scoring",
      icon: Brain,
      url: "/practice-tests",
      subjects: ["Easy", "Medium", "Hard"],
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Study Groups",
      description: "Join study groups and collaborate with peers",
      icon: Users,
      url: "/study-groups",
      subjects: ["Math", "Physics", "Chemistry", "Biology"],
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Progress Tracking",
      description: "View detailed analytics of your learning journey",
      icon: BarChart3,
      url: "/progress",
      subjects: ["Analytics", "Insights", "Goals"],
      color: "bg-orange-100 text-orange-700",
    },
    {
      title: "My Courses",
      description: "Access structured course content and lessons",
      icon: BookOpen,
      url: "/courses",
      subjects: ["Courses", "Lessons", "Assignments"],
      color: "bg-red-100 text-red-700",
    },
    {
      title: "Dashboard",
      description: "Your personalized learning hub",
      icon: Home,
      url: "/dashboard",
      subjects: ["Overview", "Schedule", "Achievements"],
      color: "bg-indigo-100 text-indigo-700",
    },
  ]

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Platform Features</h1>
          <p className="text-muted-foreground text-lg">Explore all the features available in your education platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className={`p-3 rounded-lg ${feature.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {feature.subjects.map((subject, idx) => (
                      <Badge key={idx} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                  <Link href={feature.url} className="w-full">
                    <Button className="w-full">Access Feature</Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Quick Navigation Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Learning Features</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>
                      <strong>Videos:</strong> Watch educational content by subject
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <span>
                      <strong>Practice Tests:</strong> Assess your knowledge with full tests
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>
                      <strong>Study Groups:</strong> Collaborate with other students
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Tracking & Management</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span>
                      <strong>Progress:</strong> View detailed learning analytics
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span>
                      <strong>Courses:</strong> Access structured learning paths
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                    <span>
                      <strong>Dashboard:</strong> Your personalized learning hub
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Available Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Geography", "Economics"].map(
                (subject, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-accent text-center">
                    <p className="font-medium text-accent-foreground">{subject}</p>
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
