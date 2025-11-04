"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface PreferencesStepProps {
  data: {
    learningStyle: string
    studySchedule: string
    notifications: boolean
  }
  updateData: (data: any) => void
}

const learningStyles = [
  "Visual (diagrams, charts, images)",
  "Auditory (lectures, discussions, music)",
  "Kinesthetic (hands-on, movement)",
  "Reading/Writing (text-based learning)",
  "Mixed (combination of styles)",
]

const schedules = [
  "Early morning (6-9 AM)",
  "Morning (9 AM-12 PM)",
  "Afternoon (12-5 PM)",
  "Evening (5-8 PM)",
  "Night (8-11 PM)",
  "Flexible/No preference",
]

export function PreferencesStep({ data, updateData }: PreferencesStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Preferred Learning Style</Label>
        <Select value={data.learningStyle} onValueChange={(value) => updateData({ learningStyle: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select your learning style" />
          </SelectTrigger>
          <SelectContent>
            {learningStyles.map((style) => (
              <SelectItem key={style} value={style}>
                {style}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Preferred Study Schedule</Label>
        <Select value={data.studySchedule} onValueChange={(value) => updateData({ studySchedule: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select your preferred study time" />
          </SelectTrigger>
          <SelectContent>
            {schedules.map((schedule) => (
              <SelectItem key={schedule} value={schedule}>
                {schedule}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Push Notifications</Label>
          <p className="text-sm text-muted-foreground">Receive reminders and updates about your learning progress</p>
        </div>
        <Switch checked={data.notifications} onCheckedChange={(checked) => updateData({ notifications: checked })} />
      </div>
    </div>
  )
}
