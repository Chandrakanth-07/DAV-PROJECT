"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Award, Lock, Unlock } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  criteria: string
  type: string
  earnedAt?: string
  progress?: number
  maxProgress?: number
  earned?: boolean
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      const response = await fetch("/api/achievements")
      const data = await response.json()
      setAchievements(data)
    } catch (error) {
      console.error("Error fetching achievements:", error)
    } finally {
      setLoading(false)
    }
  }

  const earnedCount = achievements.filter((a) => a.earned).length
  const totalCount = achievements.length

  const groupedAchievements = {
    earned: achievements.filter((a) => a.earned),
    inProgress: achievements.filter((a) => !a.earned && a.progress),
    locked: achievements.filter((a) => !a.earned && !a.progress),
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Award className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Achievements</h1>
          </div>
          <p className="text-muted-foreground">Unlock badges and milestones as you progress</p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 bg-card border-border">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{earnedCount}</div>
                <p className="text-muted-foreground">Achievements Earned</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-chart-2 mb-2">{groupedAchievements.inProgress.length}</div>
                <p className="text-muted-foreground">In Progress</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-chart-4 mb-2">{groupedAchievements.locked.length}</div>
                <p className="text-muted-foreground">Locked</p>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-card-foreground">Overall Progress</span>
                <span className="text-sm text-muted-foreground">{Math.round((earnedCount / totalCount) * 100)}%</span>
              </div>
              <Progress value={(earnedCount / totalCount) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Earned Achievements */}
        {groupedAchievements.earned.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Unlock className="h-6 w-6 text-green-500" />
              Earned Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedAchievements.earned.map((achievement) => (
                <Card key={achievement.id} className="bg-card border-border border-green-500/30">
                  <CardContent className="p-6">
                    <div className="text-5xl mb-3">{achievement.icon}</div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-1">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                    <Badge variant="default" className="bg-green-600">
                      Earned {new Date(achievement.earnedAt || "").toLocaleDateString()}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* In Progress Achievements */}
        {groupedAchievements.inProgress.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Award className="h-6 w-6 text-blue-500" />
              In Progress
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedAchievements.inProgress.map((achievement) => (
                <Card key={achievement.id} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="text-5xl mb-3 opacity-60">{achievement.icon}</div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-1">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-card-foreground">
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                      <Progress value={(achievement.progress! / achievement.maxProgress!) * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Locked Achievements */}
        {groupedAchievements.locked.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Lock className="h-6 w-6 text-gray-500" />
              Locked
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedAchievements.locked.map((achievement) => (
                <Card key={achievement.id} className="bg-card border-border opacity-60">
                  <CardContent className="p-6">
                    <div className="text-5xl mb-3 opacity-30">{achievement.icon}</div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-1">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                    <p className="text-xs text-muted-foreground italic">Criteria: {achievement.criteria}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
