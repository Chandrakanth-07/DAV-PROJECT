import { AuthGuard } from "@/components/auth-guard"
import { HistoryPage } from "@/components/history/history-page"

export default function History() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <HistoryPage />
      </div>
    </AuthGuard>
  )
}
