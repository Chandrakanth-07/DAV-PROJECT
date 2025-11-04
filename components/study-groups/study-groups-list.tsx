"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Plus } from "lucide-react"
import type { StudyGroup } from "@/lib/mock-data"

export function StudyGroupsList() {
  const [groups, setGroups] = useState<StudyGroup[]>([])
  const [selectedSubject, setSelectedSubject] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const [userGroups, setUserGroups] = useState<string[]>([])

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("/api/study-groups")
        const data = await response.json()
        setGroups(data)

        // Load user's groups from localStorage
        const userId = localStorage.getItem("userId") || "guest"
        const savedGroups = JSON.parse(localStorage.getItem("studyGroups") || "[]")
        const userGroupIds = savedGroups.filter((g: any) => g.members.includes(userId)).map((g: any) => g.id)
        setUserGroups(userGroupIds)
      } catch (error) {
        console.error("Error fetching groups:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGroups()
  }, [])

  const handleJoinGroup = async (groupId: string) => {
    try {
      const response = await fetch(`/api/study-groups/${groupId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "join" }),
      })

      if (response.ok) {
        setUserGroups([...userGroups, groupId])
      }
    } catch (error) {
      console.error("Error joining group:", error)
    }
  }

  const handleLeaveGroup = async (groupId: string) => {
    try {
      const response = await fetch(`/api/study-groups/${groupId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "leave" }),
      })

      if (response.ok) {
        setUserGroups(userGroups.filter((id) => id !== groupId))
      }
    } catch (error) {
      console.error("Error leaving group:", error)
    }
  }

  const filteredGroups =
    selectedSubject === "all" ? groups : groups.filter((g) => g.subject.toLowerCase() === selectedSubject.toLowerCase())

  const subjects = ["all", ...new Set(groups.map((g) => g.subject))]

  if (loading) {
    return <div className="text-center py-8">Loading study groups...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Study Groups</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Group
        </Button>
      </div>

      {/* Filter */}
      <div>
        <label className="text-sm font-medium mb-2 block">Filter by Subject</label>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="w-full md:w-48 px-3 py-2 border border-border rounded-md bg-background"
        >
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject.charAt(0).toUpperCase() + subject.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGroups.map((group) => (
          <Card key={group.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle>{group.name}</CardTitle>
                  <CardDescription>{group.subject}</CardDescription>
                </div>
                <Badge variant={group.status === "active" ? "default" : "secondary"}>{group.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{group.description}</p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                {group.members.length} / {group.maxMembers} members
              </div>

              {userGroups.includes(group.id) ? (
                <Button variant="outline" className="w-full bg-transparent" onClick={() => handleLeaveGroup(group.id)}>
                  Leave Group
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => handleJoinGroup(group.id)}
                  disabled={group.members.length >= group.maxMembers}
                >
                  Join Group
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No study groups found.</p>
        </div>
      )}
    </div>
  )
}
