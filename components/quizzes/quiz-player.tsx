"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"
import type { Quiz } from "@/lib/mock-data"

interface QuizPlayerProps {
  quizId: string
}

export function QuizPlayer({ quizId }: QuizPlayerProps) {
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/quizzes/${quizId}`)
        const data = await response.json()
        setQuiz(data)
        setAnswers(new Array(data.questions.length).fill(-1))
      } catch (error) {
        console.error("Error fetching quiz:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuiz()
  }, [quizId])

  const handleAnswerSelect = (optionIndex: number) => {
    if (!submitted) {
      const newAnswers = [...answers]
      newAnswers[currentQuestion] = optionIndex
      setAnswers(newAnswers)
    }
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/quizzes/${quizId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          correctAnswers: quiz?.questions.map((q) => q.correctAnswer) || [],
        }),
      })
      const data = await response.json()

      // Calculate percentage
      const percentage = Math.round((data.score / quiz!.questions.length) * 100)

      setResult({
        ...data,
        percentage,
        passed: percentage >= 70,
      })
      setSubmitted(true)
    } catch (error) {
      console.error("Error submitting quiz:", error)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading quiz...</div>
  }

  if (!quiz) {
    return <div className="text-center py-8">Quiz not found</div>
  }

  if (submitted && result) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Quiz Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">{result.percentage}%</div>
              <div className="text-lg">
                Score: {result.score} / {quiz.questions.length}
              </div>
              <Badge variant={result.passed ? "default" : "destructive"}>{result.passed ? "Passed" : "Failed"}</Badge>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Review Answers:</h3>
              {quiz.questions.map((question, index) => (
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
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button onClick={() => window.location.reload()} className="w-full">
              Retake Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = quiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription>
                Question {currentQuestion + 1} of {quiz.questions.length}
              </CardDescription>
            </div>
            <Badge>{Math.round(progress)}%</Badge>
          </div>
          <div className="w-full bg-secondary rounded-full h-2 mt-4">
            <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">{question.question}</h3>

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

            {currentQuestion === quiz.questions.length - 1 ? (
              <Button onClick={handleSubmit} disabled={answers.some((a) => a === -1)} className="flex-1">
                Submit Quiz
              </Button>
            ) : (
              <Button onClick={() => setCurrentQuestion(currentQuestion + 1)} className="flex-1">
                Next
              </Button>
            )}
          </div>

          {answers.some((a) => a === -1) && (
            <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4" />
              Please answer all questions before submitting
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
