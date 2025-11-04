import { AuthGuard } from "@/components/auth-guard"
import { CoursesPage } from "@/components/courses/courses-page"

export default function Courses() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <CoursesPage />
      </div>
    </AuthGuard>
  )
}
