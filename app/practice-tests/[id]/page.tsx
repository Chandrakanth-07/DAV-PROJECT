import { PracticeTestPlayer } from "@/components/practice-tests/practice-test-player"

export default function PracticeTestPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <PracticeTestPlayer testId={params.id} />
      </div>
    </div>
  )
}
