"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PersonalInfoStep } from "@/components/onboarding/personal-info-step"
import { AcademicInfoStep } from "@/components/onboarding/academic-info-step"
import { LearningGoalsStep } from "@/components/onboarding/learning-goals-step"
import { PreferencesStep } from "@/components/onboarding/preferences-step"

interface OnboardingData {
  // Personal Info
  grade: string
  school: string
  location: string

  // Academic Info
  subjects: string[]
  currentLevel: string
  strugglingSubjects: string[]

  // Learning Goals
  goals: string[]
  studyTime: string
  examPrep: string[]

  // Preferences
  learningStyle: string
  studySchedule: string
  notifications: boolean
}

const steps = [
  { id: 1, title: "Personal Info", description: "Tell us about yourself" },
  { id: 2, title: "Academic Info", description: "Your current academic status" },
  { id: 3, title: "Learning Goals", description: "What do you want to achieve?" },
  { id: 4, title: "Preferences", description: "Customize your experience" },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<OnboardingData>({
    grade: "",
    school: "",
    location: "",
    subjects: [],
    currentLevel: "",
    strugglingSubjects: [],
    goals: [],
    studyTime: "",
    examPrep: [],
    learningStyle: "",
    studySchedule: "",
    notifications: true,
  })
  const router = useRouter()

  const updateData = (stepData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...stepData }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setLoading(true)
    try {
      // Save onboarding data (in real app, send to backend)
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        // Update user data in localStorage
        const userData = localStorage.getItem("user")
        if (userData) {
          const user = JSON.parse(userData)
          const updatedUser = { ...user, ...data, onboardingComplete: true }
          localStorage.setItem("user", JSON.stringify(updatedUser))
        }
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Onboarding error:", error)
    } finally {
      setLoading(false)
    }
  }

  const progress = (currentStep / steps.length) * 100

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep data={data} updateData={updateData} />
      case 2:
        return <AcademicInfoStep data={data} updateData={updateData} />
      case 3:
        return <LearningGoalsStep data={data} updateData={updateData} />
      case 4:
        return <PreferencesStep data={data} updateData={updateData} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">Welcome to EduPlatform</h1>
          <p className="text-muted-foreground text-center mb-6">Let's personalize your learning experience</p>
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>
              Step {currentStep} of {steps.length}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                Previous
              </Button>

              {currentStep === steps.length ? (
                <Button onClick={handleComplete} disabled={loading}>
                  {loading ? "Completing..." : "Complete Setup"}
                </Button>
              ) : (
                <Button onClick={nextStep}>Next</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
