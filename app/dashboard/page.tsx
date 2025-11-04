import { AuthGuard } from "@/components/auth-guard"
import { StudentDashboard } from "@/components/student-dashboard"

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <StudentDashboard />
      </div>
    </AuthGuard>
  )
}
