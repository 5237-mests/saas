"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useExam } from "@/components/exam-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Award } from "lucide-react"
import { questionsByCategory } from "@/lib/questions" // Import directly from the lib file

export default function ResultPage() {
  const router = useRouter()
  const { selectedCategory, currentQuestions, userAnswers, examResult, examSubmitted, resetExam } = useExam()

  useEffect(() => {
    // Redirect if exam hasn't been submitted
    if (!examSubmitted) {
      router.push("/mock-test")
    }
  }, [examSubmitted, router])

  const handleRetakeTest = () => {
    resetExam()
    router.push("/mock-test")
  }

  const handleExit = () => {
    resetExam()
    router.push("/")
  }

  if (!examResult) {
    return null
  }

  const isPassed = examResult.percentage >= 70

  // Add a helper function to determine the category of a question
  const getQuestionCategory = (question: any) => {
    if (selectedCategory !== "All Categories") return selectedCategory

    // Find which category this question belongs to
    for (const [category, questions] of Object.entries(questionsByCategory)) {
      if (questions.some((q) => q.id === question.id && q.text === question.text)) {
        return category
      }
    }
    return "Unknown"
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Test Results</CardTitle>
          <CardDescription>{selectedCategory} Test</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
              {isPassed ? (
                <Award className="h-12 w-12 text-primary" />
              ) : (
                <XCircle className="h-12 w-12 text-destructive" />
              )}
            </div>
            <h2 className="text-2xl font-bold mb-2">{isPassed ? "Congratulations! You Passed" : "Test Failed"}</h2>
            <p className="text-muted-foreground">
              You scored {examResult.score} out of {examResult.total} ({Math.round(examResult.percentage)}%)
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Score</span>
              <span>{Math.round(examResult.percentage)}%</span>
            </div>
            <Progress
              value={examResult.percentage}
              className="h-2"
              color={isPassed ? "bg-primary" : "bg-destructive"}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-lg">Question Review</h3>
            {currentQuestions.map((question, index) => (
              <div key={index} className="border rounded-md p-4">
                <div className="flex items-start gap-3 mb-2">
                  {userAnswers[index] === question.correctAnswer ? (
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    {selectedCategory === "All Categories" && (
                      <span className="text-xs font-medium text-muted-foreground block mb-1">
                        {getQuestionCategory(question)}
                      </span>
                    )}
                    <p className="font-medium">{question.text}</p>
                  </div>
                </div>
                <div className="ml-8 space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`p-2 rounded-md text-sm ${
                        optionIndex === question.correctAnswer
                          ? "bg-primary/10 border border-primary/20"
                          : optionIndex === userAnswers[index]
                            ? "bg-destructive/10 border border-destructive/20"
                            : ""
                      }`}
                    >
                      {option}
                      {optionIndex === question.correctAnswer && (
                        <span className="ml-2 text-primary font-medium">(Correct Answer)</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button onClick={handleRetakeTest} className="w-full">
            Retake Test
          </Button>
          <Button onClick={handleExit} variant="outline" className="w-full">
            Exit
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

