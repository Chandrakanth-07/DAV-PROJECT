"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, BookOpen, Brain, MessageCircle, Users, Trash2, ChevronLeft, Calendar, Clock, Award } from "lucide-react"
import Link from "next/link"

interface HistoryEntry {
  id: string
  type: string
  action: string
  title: string
  description: string
  subject: string
  score?: number
  duration?: number
  timestamp: string
  metadata?: any
}

export function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [filteredHistory, setFilteredHistory] = useState<HistoryEntry[]>([])
  const [selectedType, setSelectedType] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHistory()
  }, [])

  useEffect(() => {
    filterHistory()
  }, [history, selectedType])

  const fetchHistory = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/history")
      const data = await response.json()
      setHistory(data.history || [])
    } catch (error) {
      console.error("Failed to fetch history:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterHistory = () => {
    if (selectedType === "all") {
      setFilteredHistory(history)
    } else {
      setFilteredHistory(history.filter((h) => h.type === selectedType))
    }
  }

  const deleteHistoryEntry = async (id: string) => {
    try {
      await fetch("/api/history", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ historyId: id }),
      })
      setHistory(history.filter((h) => h.id !== id))
    } catch (error) {
      console.error("Failed to delete history entry:", error)
    }
  }

  const clearAllHistory = async () => {
    if (confirm("Are you sure you want to clear all history?")) {
      try {
        await fetch("/api/history", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clearAll: true }),
        })
        setHistory([])
      } catch (error) {
        console.error("Failed to clear history:", error)
      }
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />
      case "quiz":
        return <BookOpen className="h-4 w-4" />
      case "test":
        return <Brain className="h-4 w-4" />
      case "doubt":
        return <MessageCircle className="h-4 w-4" />
      case "group":
        return <Users className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-blue-100 text-blue-800"
      case "quiz":
        return "bg-green-100 text-green-800"
      case "test":
        return "bg-purple-100 text-purple-800"
      case "doubt":
        return "bg-orange-100 text-orange-800"
      case "group":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })
    }
  }

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
            <Clock className="h-8 w-8 text-sidebar-primary" />
            <h1 className="text-xl font-semibold text-sidebar-foreground">History</h1>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-sidebar-foreground">Filter by Type</h3>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activities</SelectItem>
                <SelectItem value="video">Videos Watched</SelectItem>
                <SelectItem value="quiz">Quizzes Taken</SelectItem>
                <SelectItem value="test">Practice Tests</SelectItem>
                <SelectItem value="doubt">Doubts Posted</SelectItem>
                <SelectItem value="group">Study Groups</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-6 pt-6 border-t border-sidebar-border">
            <Button variant="outline" size="sm" onClick={clearAllHistory} className="w-full bg-transparent">
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All History
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-card-foreground">Learning History</h1>
                <p className="text-sm text-muted-foreground">Track all your learning activities</p>
              </div>
              <Badge variant="secondary">{filteredHistory.length} activities</Badge>
            </div>
          </div>
        </header>

        {/* History Content */}
        <main className="flex-1 p-6">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <p className="text-muted-foreground">Loading history...</p>
            </div>
          ) : filteredHistory.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-card-foreground mb-2">No history yet</p>
                <p className="text-sm text-muted-foreground">
                  {selectedType === "all"
                    ? "Your learning activities will appear here"
                    : `No ${selectedType} activities yet`}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredHistory.map((entry) => (
                <Card key={entry.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`p-2 rounded-lg ${getTypeColor(entry.type)}`}>{getTypeIcon(entry.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-card-foreground">{entry.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {entry.action}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{entry.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(entry.timestamp)}
                            </span>
                            {entry.subject && (
                              <span className="px-2 py-1 rounded bg-accent text-accent-foreground">
                                {entry.subject}
                              </span>
                            )}
                            {entry.score !== undefined && (
                              <span className="flex items-center gap-1">
                                <Award className="h-3 w-3" />
                                Score: {entry.score}%
                              </span>
                            )}
                            {entry.duration !== undefined && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {entry.duration} min
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteHistoryEntry(entry.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
