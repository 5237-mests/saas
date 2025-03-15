import type React from "react"
import { ExamProvider } from "@/components/exam-context"

export default function MockTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-primary text-primary-foreground p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Driving License Mock Exam</h1>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4">
        <ExamProvider>{children}</ExamProvider>
      </main>
    </div>
  )
}

