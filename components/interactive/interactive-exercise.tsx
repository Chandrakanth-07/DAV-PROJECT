"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, RotateCcw, Lightbulb } from "lucide-react"

interface InteractiveExerciseProps {
  content: {
    type: string
    function: string
    parameters: { [key: string]: number }
    exercises: Array<{
      instruction: string
      target: string
    }>
  }
  onProgress: (progress: number) => void
  onComplete: () => void
}

export function InteractiveExercise({ content, onProgress, onComplete }: InteractiveExerciseProps) {
  const [parameters, setParameters] = useState(content.parameters)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [completedExercises, setCompletedExercises] = useState<boolean[]>(
    new Array(content.exercises.length).fill(false),
  )
  const [showHint, setShowHint] = useState(false)

  const updateParameter = (param: string, value: number) => {
    setParameters((prev) => ({ ...prev, [param]: value }))
  }

  const checkAnswer = () => {
    // Simple validation logic - in real app, this would be more sophisticated
    const exercise = content.exercises[currentExercise]
    let isCorrect = false

    if (exercise.target.includes("a to 2")) {
      isCorrect = parameters.a === 2
    } else if (exercise.target.includes("a=1, b=0, c=3")) {
      isCorrect = parameters.a === 1 && parameters.b === 0 && parameters.c === 3
    }

    if (isCorrect) {
      const newCompleted = [...completedExercises]
      newCompleted[currentExercise] = true
      setCompletedExercises(newCompleted)

      const progress = (newCompleted.filter(Boolean).length / content.exercises.length) * 100
      onProgress(progress)

      if (newCompleted.every(Boolean)) {
        onComplete()
      }
    }
  }

  const resetParameters = () => {
    setParameters(content.parameters)
  }

  const nextExercise = () => {
    if (currentExercise < content.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      setShowHint(false)
    }
  }

  const prevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1)
      setShowHint(false)
    }
  }

  const generateGraphPoints = () => {
    const points = []
    const { a, b, c } = parameters
    for (let x = -5; x <= 5; x += 0.5) {
      const y = a * x * x + b * x + c
      points.push({ x, y })
    }
    return points
  }

  const exercise = content.exercises[currentExercise]
  const isCompleted = completedExercises[currentExercise]

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interactive Graph */}
        <Card>
          <CardHeader>
            <CardTitle>Quadratic Function Grapher</CardTitle>
            <p className="text-sm text-muted-foreground">
              Function: y = {parameters.a}x² + {parameters.b}x + {parameters.c}
            </p>
          </CardHeader>
          <CardContent>
            {/* Simplified graph representation */}
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
              <svg width="100%" height="100%" viewBox="-10 -10 20 20" className="absolute inset-0">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="2" height="2" patternUnits="userSpaceOnUse">
                    <path d="M 2 0 L 0 0 0 2" fill="none" stroke="#e5e7eb" strokeWidth="0.1" />
                  </pattern>
                </defs>
                <rect width="20" height="20" x="-10" y="-10" fill="url(#grid)" />

                {/* Axes */}
                <line x1="-10" y1="0" x2="10" y2="0" stroke="#6b7280" strokeWidth="0.2" />
                <line x1="0" y1="-10" x2="0" y2="10" stroke="#6b7280" strokeWidth="0.2" />

                {/* Parabola */}
                <path
                  d={`M ${generateGraphPoints()
                    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${-point.y}`)
                    .join(" ")}`}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="0.3"
                />
              </svg>
            </div>

            {/* Parameter Controls */}
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="param-a">a = {parameters.a}</Label>
                  <Input
                    id="param-a"
                    type="range"
                    min="-3"
                    max="3"
                    step="0.5"
                    value={parameters.a}
                    onChange={(e) => updateParameter("a", Number.parseFloat(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="param-b">b = {parameters.b}</Label>
                  <Input
                    id="param-b"
                    type="range"
                    min="-5"
                    max="5"
                    step="1"
                    value={parameters.b}
                    onChange={(e) => updateParameter("b", Number.parseFloat(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="param-c">c = {parameters.c}</Label>
                  <Input
                    id="param-c"
                    type="range"
                    min="-5"
                    max="5"
                    step="1"
                    value={parameters.c}
                    onChange={(e) => updateParameter("c", Number.parseFloat(e.target.value))}
                  />
                </div>
              </div>
              <Button variant="outline" onClick={resetParameters} className="w-full bg-transparent">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Parameters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Exercise Instructions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                Exercise {currentExercise + 1} of {content.exercises.length}
              </CardTitle>
              {isCompleted && (
                <Badge variant="default" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Complete
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <p className="font-medium text-blue-900">{exercise.instruction}</p>
            </div>

            <div className="space-y-3">
              <Button variant="ghost" onClick={() => setShowHint(!showHint)} className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                {showHint ? "Hide" : "Show"} Target
              </Button>

              {showHint && (
                <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                  <p className="text-sm text-yellow-800">{exercise.target}</p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button onClick={checkAnswer} disabled={isCompleted} className="flex-1">
                {isCompleted ? "Completed" : "Check Answer"}
              </Button>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={prevExercise} disabled={currentExercise === 0}>
                Previous
              </Button>
              <Button
                onClick={nextExercise}
                disabled={currentExercise === content.exercises.length - 1 || !isCompleted}
              >
                Next Exercise
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
