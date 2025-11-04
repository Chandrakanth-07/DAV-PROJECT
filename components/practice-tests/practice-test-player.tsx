"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock } from "lucide-react"
import type { PracticeTest } from "@/lib/mock-data"

interface PracticeTestPlayerProps {
  testId: string
}

export function PracticeTestPlayer({ testId }: PracticeTestPlayerProps) {
  const [test, setTest] = useState<PracticeTest | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await fetch(`/api/practice-tests/${testId}`)
        const data = await response.json()
        setTest(data)
        setAnswers(new Array(data.questions.length).fill(-1))
        setTimeLeft(data.duration)
      } catch (error) {
        console.error("Error fetching test:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTest()
  }, [testId])

  useEffect(() => {
    if (timeLeft <= 0 || submitted) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, submitted])

  const handleAnswerSelect = (optionIndex: number) => {
    if (!submitted) {
      const newAnswers = [...answers]
      newAnswers[currentQuestion] = optionIndex
      setAnswers(newAnswers)
    }
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/practice-tests/${testId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      })
      const data = await response.json()
      setResult(data)
      setSubmitted(true)
    } catch (error) {
      console.error("Error submitting test:", error)
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (loading) {
    return <div className="text-center py-8">Loading practice test...</div>
  }

  if (!test) {
    return <div className="text-center py-8">Practice test not found</div>
  }

  if (submitted && result) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">{result.percentage.toFixed(1)}%</div>
              <div className="text-lg">
                Score: {result.obtainedMarks} / {result.totalMarks} marks
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Review Answers:</h3>
              {test.questions.map((question, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    {answers[index] === question.correctAnswer ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{question.question}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your answer: {question.options[answers[index]]}
                      </p>
                      {answers[index] !== question.correctAnswer && (
                        <p className="text-sm text-green-600 mt-1">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground mt-2 italic">{question.explanation}</p>
                      <p className="text-sm font-medium mt-2">Marks: {question.marks}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button onClick={() => window.location.reload()} className="w-full">
              Retake Test
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = test.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / test.questions.length) * 100

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{test.title}</CardTitle>
              <CardDescription>
                Question {currentQuestion + 1} of {test.questions.length}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Clock className="w-5 h-5" />
              {formatTime(timeLeft)}
            </div>
          </div>
          <div className="w-full bg-secondary rounded-full h-2 mt-4">
            <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{question.question}</h3>
              <Badge variant="outline">Marks: {question.marks}</Badge>
            </div>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                    answers[currentQuestion] === index
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        answers[currentQuestion] === index ? "border-primary bg-primary" : "border-border"
                      }`}
                    >
                      {answers[currentQuestion] === index && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>

            {currentQuestion === test.questions.length - 1 ? (
              <Button onClick={handleSubmit} className="flex-1">
                Submit Test
              </Button>
            ) : (
              <Button onClick={() => setCurrentQuestion(currentQuestion + 1)} className="flex-1">
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
