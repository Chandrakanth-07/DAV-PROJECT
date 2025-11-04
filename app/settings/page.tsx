"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings } from "lucide-react"
import { useAuth } from "@/components/auth-guard"

interface UserSettings {
  notificationsEnabled: boolean
  emailNotifications: boolean
  studyGoalHours: number
  preferredSubjects: string[]
  theme: "light" | "dark"
  language: string
}

export default function SettingsPage() {
  const { user } = useAuth()
  const [settings, setSettings] = useState<UserSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/settings")
      const data = await response.json()
      setSettings(data)
    } catch (error) {
      console.error("Error fetching settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    if (!settings) return

    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (error) {
      console.error("Error saving settings:", error)
    }
  }

  if (loading || !settings) {
    return <div className="min-h-screen bg-background p-6">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          </div>
          <p className="text-muted-foreground">Manage your profile and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-card-foreground">Full Name</label>
                    <Input
                      value={user?.name || ""}
                      disabled
                      className="mt-2 bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-card-foreground">Email</label>
                    <Input
                      value={user?.email || ""}
                      disabled
                      className="mt-2 bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-card-foreground">Grade/Level</label>
                    <Input
                      value={user?.grade || ""}
                      disabled
                      className="mt-2 bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-card-foreground">Subjects</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {user?.subjects?.map((subject) => (
                        <Badge key={subject} variant="secondary">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">
                    To update your profile information, please contact support.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Learning Tab */}
          <TabsContent value="learning" className="mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Learning Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-card-foreground">Weekly Study Goal (hours)</label>
                  <Input
                    type="number"
                    value={settings.studyGoalHours}
                    onChange={(e) => setSettings({ ...settings, studyGoalHours: Number.parseInt(e.target.value) })}
                    className="mt-2 bg-background border-border text-foreground"
                  />
                  <p className="text-xs text-muted-foreground mt-2">Set your target study hours per week</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-card-foreground">Preferred Subjects</label>
                  <div className="mt-2 space-y-2">
                    {["Mathematics", "Physics", "Chemistry", "Biology"].map((subject) => (
                      <label key={subject} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.preferredSubjects.includes(subject)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSettings({
                                ...settings,
                                preferredSubjects: [...settings.preferredSubjects, subject],
                              })
                            } else {
                              setSettings({
                                ...settings,
                                preferredSubjects: settings.preferredSubjects.filter((s) => s !== subject),
                              })
                            }
                          }}
                          className="rounded border-border"
                        />
                        <span className="text-sm text-card-foreground">{subject}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-card-foreground">Language</label>
                  <Select
                    value={settings.language}
                    onValueChange={(value) => setSettings({ ...settings, language: value })}
                  >
                    <SelectTrigger className="mt-2 bg-background border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <label className="flex items-center justify-between cursor-pointer p-4 rounded-lg bg-accent">
                  <div>
                    <p className="font-medium text-accent-foreground">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications in the app</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notificationsEnabled}
                    onChange={(e) => setSettings({ ...settings, notificationsEnabled: e.target.checked })}
                    className="rounded border-border"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer p-4 rounded-lg bg-accent">
                  <div>
                    <p className="font-medium text-accent-foreground">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive email updates</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                    className="rounded border-border"
                  />
                </label>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    You'll receive notifications about new quizzes, study reminders, and achievement unlocks.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Appearance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-card-foreground">Theme</label>
                  <Select
                    value={settings.theme}
                    onValueChange={(value: any) => setSettings({ ...settings, theme: value })}
                  >
                    <SelectTrigger className="mt-2 bg-background border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-2">Choose your preferred color scheme</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="mt-8 flex gap-4">
          <Button onClick={handleSaveSettings} className="gap-2">
            <Settings className="h-4 w-4" />
            Save Settings
          </Button>
          {saved && (
            <Badge variant="default" className="bg-green-600">
              Settings saved successfully!
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}
