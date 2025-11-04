import { AuthGuard } from "@/components/auth-guard"
import { LessonPage } from "@/components/courses/lesson-page"

interface LessonPageProps {
  params: {
    courseId: string
    lessonId: string
  }
}

export default function Lesson({ params }: LessonPageProps) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <LessonPage courseId={params.courseId} lessonId={params.lessonId} />
      </div>
    </AuthGuard>
  )
}
