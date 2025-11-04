"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen } from "lucide-react"
import Link from "next/link"
import type { PracticeTest } from "@/lib/mock-data"

export default function PracticeTestsPage() {
  const [tests, setTests] = useState<PracticeTest[]>([])
  const [filteredTests, setFilteredTests] = useState<PracticeTest[]>([])
  const [selectedSubject, setSelectedSubject] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch("/api/practice-tests")
        const data = await response.json()
        setTests(data)
        setFilteredTests(data)
      } catch (error) {
        console.error("Error fetching tests:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTests()
  }, [])

  useEffect(() => {
    let filtered = tests

    if (selectedSubject !== "all") {
      filtered = filtered.filter((t) => t.subject.toLowerCase() === selectedSubject.toLowerCase())
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter((t) => t.difficulty === selectedDifficulty)
    }

    setFilteredTests(filtered)
  }, [selectedSubject, selectedDifficulty, tests])

  const subjects = ["all", ...new Set(tests.map((t) => t.subject))]
  const difficulties = ["all", "easy", "medium", "hard"]

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    return `${minutes} min`
  }

  if (loading) {
    return <div className="text-center py-8">Loading practice tests...</div>
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Practice Tests</h1>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject.charAt(0).toUpperCase() + subject.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle>{test.title}</CardTitle>
                    <CardDescription>{test.subject}</CardDescription>
                  </div>
                  <Badge variant="outline">{test.difficulty}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatDuration(test.duration)}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {test.totalQuestions} questions
                  </div>
                </div>

                <Link href={`/practice-tests/${test.id}`}>
                  <Button className="w-full">Start Test</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No practice tests found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
