"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, HelpCircle, ArrowRight } from "lucide-react"

interface Question {
  id: number
  question: string
  type: "multiple-choice" | "input" | "true-false"
  options?: string[]
  correct: number | string
  explanation: string
}

interface QuizComponentProps {
  questions: Question[]
  onProgress: (progress: number) => void
  onComplete: () => void
}

export function QuizComponent({ questions, onProgress, onComplete }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<(number | string | null)[]>(new Array(questions.length).fill(null))
  const [showResults, setShowResults] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswer = (answer: number | string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowExplanation(false)
    } else {
      finishQuiz()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setShowExplanation(false)
    }
  }

  const finishQuiz = () => {
    let correctAnswers = 0
    questions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        correctAnswers++
      }
    })
    setScore(correctAnswers)
    setShowResults(true)
    onProgress(100)
    onComplete()
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers(new Array(questions.length).fill(null))
    setShowResults(false)
    setShowExplanation(false)
    setScore(0)
    onProgress(0)
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <div className="p-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="text-6xl font-bold text-primary">{percentage}%</div>
            <div>
              <p className="text-lg">
                You scored {score} out of {questions.length} questions correctly
              </p>
              <Badge
                variant={percentage >= 80 ? "default" : percentage >= 60 ? "secondary" : "destructive"}
                className="mt-2"
              >
                {percentage >= 80 ? "Excellent!" : percentage >= 60 ? "Good Job!" : "Keep Practicing!"}
              </Badge>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Review Your Answers</h3>
              {questions.map((q, index) => {
                const isCorrect = answers[index] === q.correct
                return (
                  <div key={q.id} className="text-left p-4 rounded-lg bg-accent">
                    <div className="flex items-start gap-2">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{q.question}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your answer:{" "}
                          {q.type === "multiple-choice" ? q.options?.[answers[index] as number] : answers[index]}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-green-600 mt-1">
                            Correct answer:{" "}
                            {q.type === "multiple-choice" ? q.options?.[q.correct as number] : q.correct}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground mt-2">{q.explanation}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex gap-3 justify-center">
              <Button onClick={resetQuiz} variant="outline">
                Retake Quiz
              </Button>
              <Button onClick={onComplete}>Continue Learning</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <Badge variant="outline">{Math.round(progress)}% Complete</Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {question.type === "multiple-choice" && question.options && (
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant={answers[currentQuestion] === index ? "default" : "outline"}
                  className="w-full justify-start text-left h-auto p-4"
                  onClick={() => handleAnswer(index)}
                >
                  <span className="mr-3 font-semibold">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </div>
          )}

          {question.type === "input" && (
            <Input
              placeholder="Enter your answer"
              value={(answers[currentQuestion] as string) || ""}
              onChange={(e) => handleAnswer(e.target.value)}
            />
          )}

          {question.type === "true-false" && (
            <div className="flex gap-4">
              <Button
                variant={answers[currentQuestion] === "true" ? "default" : "outline"}
                className="flex-1"
                onClick={() => handleAnswer("true")}
              >
                True
              </Button>
              <Button
                variant={answers[currentQuestion] === "false" ? "default" : "outline"}
                className="flex-1"
                onClick={() => handleAnswer("false")}
              >
                False
              </Button>
            </div>
          )}

          {answers[currentQuestion] !== null && (
            <div className="space-y-3">
              <Button
                variant="ghost"
                onClick={() => setShowExplanation(!showExplanation)}
                className="flex items-center gap-2"
              >
                <HelpCircle className="h-4 w-4" />
                {showExplanation ? "Hide" : "Show"} Explanation
              </Button>

              {showExplanation && (
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <p className="text-sm">{question.explanation}</p>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
              Previous
            </Button>
            <Button onClick={nextQuestion} disabled={answers[currentQuestion] === null}>
              {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
