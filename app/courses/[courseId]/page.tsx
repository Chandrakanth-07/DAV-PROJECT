import { AuthGuard } from "@/components/auth-guard"
import { CourseDetailPage } from "@/components/courses/course-detail-page"

interface CoursePageProps {
  params: {
    courseId: string
  }
}

export default function CoursePage({ params }: CoursePageProps) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <CourseDetailPage courseId={params.courseId} />
      </div>
    </AuthGuard>
  )
}
