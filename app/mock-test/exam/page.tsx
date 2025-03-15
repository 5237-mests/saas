"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useExam } from "@/components/exam-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function ExamPage() {
  const router = useRouter()
  const {
    selectedCategory,
    currentQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    userAnswers,
    setUserAnswer,
    examStarted,
  } = useExam()

  useEffect(() => {
    // Redirect if exam hasn't started or no category selected
    if (!examStarted || !selectedCategory) {
      router.push("/mock-test")
    }
  }, [examStarted, selectedCategory, router])

  const currentQuestion = currentQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100

  const handleNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmit = () => {
    router.push("/mock-test/submit")
  }

  const handleAnswerSelect = (value: string) => {
    setUserAnswer(currentQuestionIndex, Number.parseInt(value))
  }

  if (!currentQuestion) {
    return null
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">{selectedCategory} Test</span>
            <span className="text-sm font-medium">
              Question {currentQuestionIndex + 1} of {currentQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <CardTitle className="mt-4 text-xl">{currentQuestion.text}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={userAnswers[currentQuestionIndex]?.toString() || ""}
            onValueChange={handleAnswerSelect}
            className="space-y-3"
          >
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-3">
            <Button onClick={handlePrevious} variant="outline" disabled={currentQuestionIndex === 0}>
              Previous
            </Button>
            <Button onClick={handleNext} disabled={currentQuestionIndex === currentQuestions.length - 1}>
              Next
            </Button>
          </div>
          <Button onClick={handleSubmit} variant="secondary">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

