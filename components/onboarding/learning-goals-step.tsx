"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface LearningGoalsStepProps {
  data: {
    goals: string[]
    studyTime: string
    examPrep: string[]
  }
  updateData: (data: any) => void
}

const learningGoals = [
  "Improve grades",
  "Prepare for exams",
  "Learn new concepts",
  "Build confidence",
  "Catch up with class",
  "Get ahead of curriculum",
  "Develop study habits",
  "Prepare for college",
  "Career preparation",
  "Personal interest",
]

const studyTimes = ["Less than 1 hour/day", "1-2 hours/day", "2-3 hours/day", "3-4 hours/day", "More than 4 hours/day"]

const exams = [
  "SAT",
  "ACT",
  "AP Exams",
  "IB Exams",
  "State Tests",
  "Final Exams",
  "Entrance Exams",
  "Professional Certifications",
  "None",
]

export function LearningGoalsStep({ data, updateData }: LearningGoalsStepProps) {
  const handleGoalChange = (goal: string, checked: boolean) => {
    const updatedGoals = checked ? [...data.goals, goal] : data.goals.filter((g) => g !== goal)
    updateData({ goals: updatedGoals })
  }

  const handleExamChange = (exam: string, checked: boolean) => {
    const updatedExams = checked ? [...data.examPrep, exam] : data.examPrep.filter((e) => e !== exam)
    updateData({ examPrep: updatedExams })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>Learning Goals (Select all that apply)</Label>
        <div className="grid grid-cols-2 gap-3">
          {learningGoals.map((goal) => (
            <div key={goal} className="flex items-center space-x-2">
              <Checkbox
                id={`goal-${goal}`}
                checked={data.goals.includes(goal)}
                onCheckedChange={(checked) => handleGoalChange(goal, checked as boolean)}
              />
              <Label htmlFor={`goal-${goal}`} className="text-sm">
                {goal}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>How much time can you dedicate to studying daily?</Label>
        <Select value={data.studyTime} onValueChange={(value) => updateData({ studyTime: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select your available study time" />
          </SelectTrigger>
          <SelectContent>
            {studyTimes.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>Exam Preparation (Select all that apply)</Label>
        <div className="grid grid-cols-2 gap-3">
          {exams.map((exam) => (
            <div key={exam} className="flex items-center space-x-2">
              <Checkbox
                id={`exam-${exam}`}
                checked={data.examPrep.includes(exam)}
                onCheckedChange={(checked) => handleExamChange(exam, checked as boolean)}
              />
              <Label htmlFor={`exam-${exam}`} className="text-sm">
                {exam}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
