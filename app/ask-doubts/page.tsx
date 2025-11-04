"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, Search, Plus, Eye, MessageSquare, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

interface Doubt {
  id: string
  title: string
  subject: string
  userName: string
  createdAt: string
  responses: any[]
  status: "open" | "resolved"
  views: number
}

export default function AskDoubtsPage() {
  const [doubts, setDoubts] = useState<Doubt[]>([])
  const [filteredDoubts, setFilteredDoubts] = useState<Doubt[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showNewDoubtForm, setShowNewDoubtForm] = useState(false)
  const [newDoubt, setNewDoubt] = useState({ subject: "", title: "", description: "" })

  useEffect(() => {
    fetchDoubts()
  }, [])

  useEffect(() => {
    filterDoubts()
  }, [doubts, searchTerm, selectedSubject, selectedStatus])

  const fetchDoubts = async () => {
    try {
      const response = await fetch("/api/doubts")
      const data = await response.json()
      setDoubts(data)
    } catch (error) {
      console.error("Error fetching doubts:", error)
    }
  }

  const filterDoubts = () => {
    let filtered = doubts

    if (searchTerm) {
      filtered = filtered.filter(
        (d) =>
          d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.subject.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedSubject !== "all") {
      filtered = filtered.filter((d) => d.subject === selectedSubject)
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((d) => d.status === selectedStatus)
    }

    setFilteredDoubts(filtered)
  }

  const handlePostDoubt = async () => {
    if (!newDoubt.subject || !newDoubt.title || !newDoubt.description) {
      alert("Please fill all fields")
      return
    }

    try {
      const response = await fetch("/api/doubts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDoubt),
      })

      if (response.ok) {
        setNewDoubt({ subject: "", title: "", description: "" })
        setShowNewDoubtForm(false)
        fetchDoubts()
      }
    } catch (error) {
      console.error("Error posting doubt:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Ask Doubts</h1>
            </div>
            <Button onClick={() => setShowNewDoubtForm(!showNewDoubtForm)} className="gap-2">
              <Plus className="h-4 w-4" />
              Post a Doubt
            </Button>
          </div>
          <p className="text-muted-foreground">Get answers from the community and experts</p>
        </div>

        {/* New Doubt Form */}
        {showNewDoubtForm && (
          <Card className="mb-8 bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Post Your Doubt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-card-foreground">Subject</label>
                <Select
                  value={newDoubt.subject}
                  onValueChange={(value) => setNewDoubt({ ...newDoubt, subject: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-card-foreground">Title</label>
                <Input
                  placeholder="What's your doubt about?"
                  value={newDoubt.title}
                  onChange={(e) => setNewDoubt({ ...newDoubt, title: e.target.value })}
                  className="bg-background border-border text-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-card-foreground">Description</label>
                <textarea
                  placeholder="Describe your doubt in detail..."
                  value={newDoubt.description}
                  onChange={(e) => setNewDoubt({ ...newDoubt, description: e.target.value })}
                  className="w-full p-3 rounded-lg bg-background border border-border text-foreground min-h-32"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handlePostDoubt}>Post Doubt</Button>
                <Button variant="outline" onClick={() => setShowNewDoubtForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search doubts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background border-border text-foreground"
            />
          </div>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="bg-background border-border text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              <SelectItem value="Physics">Physics</SelectItem>
              <SelectItem value="Chemistry">Chemistry</SelectItem>
              <SelectItem value="Biology">Biology</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="bg-background border-border text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Doubts List */}
        <div className="space-y-4">
          {filteredDoubts.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No doubts found. Be the first to ask!</p>
              </CardContent>
            </Card>
          ) : (
            filteredDoubts.map((doubt) => (
              <Link key={doubt.id} href={`/ask-doubts/${doubt.id}`}>
                <Card className="bg-card border-border hover:border-primary cursor-pointer transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-card-foreground mb-2">{doubt.title}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="secondary">{doubt.subject}</Badge>
                          <Badge variant={doubt.status === "resolved" ? "default" : "outline"}>
                            {doubt.status === "resolved" ? (
                              <>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Resolved
                              </>
                            ) : (
                              <>
                                <Clock className="h-3 w-3 mr-1" />
                                Open
                              </>
                            )}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span>Asked by {doubt.userName}</span>
                        <span>{new Date(doubt.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {doubt.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {doubt.responses.length}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
