import { AuthGuard } from "@/components/auth-guard"
import { ProgressPage } from "@/components/progress/progress-page"

export default function Progress() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <ProgressPage />
      </div>
    </AuthGuard>
  )
}
