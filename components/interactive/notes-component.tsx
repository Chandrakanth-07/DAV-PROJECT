"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { PenTool, Save, Trash2, Plus } from "lucide-react"

interface Note {
  id: string
  content: string
  timestamp: Date
  lessonId: string
}

interface NotesComponentProps {
  lessonId: string
}

export function NotesComponent({ lessonId }: NotesComponentProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState("")
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [editContent, setEditContent] = useState("")

  useEffect(() => {
    // Load notes from localStorage (in real app, fetch from backend)
    const savedNotes = localStorage.getItem(`notes-${lessonId}`)
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
        ...note,
        timestamp: new Date(note.timestamp),
      }))
      setNotes(parsedNotes)
    }
  }, [lessonId])

  const saveNotes = (updatedNotes: Note[]) => {
    localStorage.setItem(`notes-${lessonId}`, JSON.stringify(updatedNotes))
    setNotes(updatedNotes)
  }

  const addNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        content: newNote.trim(),
        timestamp: new Date(),
        lessonId,
      }
      const updatedNotes = [note, ...notes]
      saveNotes(updatedNotes)
      setNewNote("")
    }
  }

  const deleteNote = (noteId: string) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId)
    saveNotes(updatedNotes)
  }

  const startEdit = (note: Note) => {
    setIsEditing(note.id)
    setEditContent(note.content)
  }

  const saveEdit = () => {
    if (isEditing && editContent.trim()) {
      const updatedNotes = notes.map((note) =>
        note.id === isEditing ? { ...note, content: editContent.trim() } : note,
      )
      saveNotes(updatedNotes)
      setIsEditing(null)
      setEditContent("")
    }
  }

  const cancelEdit = () => {
    setIsEditing(null)
    setEditContent("")
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="space-y-6">
      {/* Add New Note */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PenTool className="h-5 w-5" />
            Add Note
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Write your notes here..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            rows={4}
          />
          <Button onClick={addNote} disabled={!newNote.trim()} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Note
          </Button>
        </CardContent>
      </Card>

      {/* Notes List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Your Notes</h3>
          <Badge variant="secondary">{notes.length} notes</Badge>
        </div>

        {notes.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <PenTool className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No notes yet. Add your first note above!</p>
            </CardContent>
          </Card>
        ) : (
          notes.map((note) => (
            <Card key={note.id}>
              <CardContent className="pt-6">
                {isEditing === note.id ? (
                  <div className="space-y-4">
                    <Textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={4} />
                    <div className="flex gap-2">
                      <Button onClick={saveEdit} size="sm">
                        <Save className="mr-2 h-3 w-3" />
                        Save
                      </Button>
                      <Button onClick={cancelEdit} variant="outline" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm leading-relaxed">{note.content}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{formatDate(note.timestamp)}</span>
                      <div className="flex gap-2">
                        <Button onClick={() => startEdit(note)} variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button onClick={() => deleteNote(note.id)} variant="ghost" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
