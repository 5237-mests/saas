"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function ResultsHistoryPage() {
  const router = useRouter()

  // In a real application, this would fetch from a database
  const mockResults = [
    { id: 1, date: "2023-03-14", category: "Traffic Rules", score: 80, total: 100 },
    { id: 2, date: "2023-03-10", category: "Engine", score: 65, total: 100 },
    { id: 3, date: "2023-03-05", category: "Road Signs", score: 90, total: 100 },
  ]

  const handleBack = () => {
    router.push("/mock-test")
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Button variant="ghost" className="mb-4" onClick={handleBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Tests
      </Button>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Your Test History</CardTitle>
          <CardDescription>View your past test results</CardDescription>
        </CardHeader>
        <CardContent>
          {mockResults.length > 0 ? (
            <div className="space-y-4">
              {mockResults.map((result) => (
                <div
                  key={result.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-md hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <h3 className="font-medium">{result.category}</h3>
                    <p className="text-sm text-muted-foreground">{new Date(result.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-2 sm:mt-0">
                    <div
                      className={`px-2 py-1 rounded-md text-sm font-medium ${
                        (result.score / result.total) * 100 >= 70
                          ? "bg-primary/10 text-primary"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {(result.score / result.total) * 100}%
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">You haven't taken any tests yet.</p>
              <Button className="mt-4" onClick={handleBack}>
                Take Your First Test
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

