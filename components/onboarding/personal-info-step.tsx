"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PersonalInfoStepProps {
  data: {
    grade: string
    school: string
    location: string
  }
  updateData: (data: any) => void
}

const grades = [
  "6th Grade",
  "7th Grade",
  "8th Grade",
  "9th Grade",
  "10th Grade",
  "11th Grade",
  "12th Grade",
  "College Freshman",
  "College Sophomore",
  "College Junior",
  "College Senior",
  "Graduate Student",
]

export function PersonalInfoStep({ data, updateData }: PersonalInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="grade">Current Grade/Level</Label>
        <Select value={data.grade} onValueChange={(value) => updateData({ grade: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select your grade level" />
          </SelectTrigger>
          <SelectContent>
            {grades.map((grade) => (
              <SelectItem key={grade} value={grade}>
                {grade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="school">School/Institution</Label>
        <Input
          id="school"
          placeholder="Enter your school name"
          value={data.school}
          onChange={(e) => updateData({ school: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location (City, State)</Label>
        <Input
          id="location"
          placeholder="Enter your location"
          value={data.location}
          onChange={(e) => updateData({ location: e.target.value })}
        />
      </div>
    </div>
  )
}
