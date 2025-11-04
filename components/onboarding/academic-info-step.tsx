"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface AcademicInfoStepProps {
  data: {
    subjects: string[]
    currentLevel: string
    strugglingSubjects: string[]
  }
  updateData: (data: any) => void
}

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Geography",
  "Computer Science",
  "Economics",
  "Psychology",
  "Literature",
  "Foreign Languages",
  "Art",
  "Music",
  "Physical Education",
]

const levels = ["Beginner", "Elementary", "Intermediate", "Advanced", "Expert"]

export function AcademicInfoStep({ data, updateData }: AcademicInfoStepProps) {
  const handleSubjectChange = (subject: string, checked: boolean) => {
    const updatedSubjects = checked ? [...data.subjects, subject] : data.subjects.filter((s) => s !== subject)
    updateData({ subjects: updatedSubjects })
  }

  const handleStrugglingSubjectChange = (subject: string, checked: boolean) => {
    const updatedSubjects = checked
      ? [...data.strugglingSubjects, subject]
      : data.strugglingSubjects.filter((s) => s !== subject)
    updateData({ strugglingSubjects: updatedSubjects })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Current Academic Level</Label>
        <Select value={data.currentLevel} onValueChange={(value) => updateData({ currentLevel: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select your academic level" />
          </SelectTrigger>
          <SelectContent>
            {levels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>Subjects of Interest (Select all that apply)</Label>
        <div className="grid grid-cols-2 gap-3">
          {subjects.map((subject) => (
            <div key={subject} className="flex items-center space-x-2">
              <Checkbox
                id={`subject-${subject}`}
                checked={data.subjects.includes(subject)}
                onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
              />
              <Label htmlFor={`subject-${subject}`} className="text-sm">
                {subject}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label>Subjects You Need Help With (Optional)</Label>
        <div className="grid grid-cols-2 gap-3">
          {data.subjects.map((subject) => (
            <div key={subject} className="flex items-center space-x-2">
              <Checkbox
                id={`struggling-${subject}`}
                checked={data.strugglingSubjects.includes(subject)}
                onCheckedChange={(checked) => handleStrugglingSubjectChange(subject, checked as boolean)}
              />
              <Label htmlFor={`struggling-${subject}`} className="text-sm">
                {subject}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
