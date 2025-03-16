"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useExam } from "@/components/exam-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  XCircle,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { questionsByCategory } from "@/lib/questions";

export default function ResultPage() {
  const router = useRouter();
  const {
    selectedCategory,
    currentQuestions,
    userAnswers,
    examResult,
    examSubmitted,
    resetExam,
  } = useExam();

  // Add state for pagination
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    // Redirect if exam hasn't been submitted
    if (!examSubmitted) {
      router.push("/mock-test");
    }
  }, [examSubmitted, router]);

  const handleRetakeTest = () => {
    resetExam();
    router.push("/mock-test");
  };

  const handleExit = () => {
    resetExam();
    router.push("/");
  };

  if (!examResult) {
    return null;
  }

  const isPassed = examResult.percentage >= 70;

  // Navigation functions
  const goToPreviousQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prev) =>
      Math.min(currentQuestions.length - 1, prev + 1)
    );
  };

  // Get the current question
  const currentQuestion = currentQuestions[currentQuestionIndex];
  const userAnswer = userAnswers[currentQuestionIndex];
  const isCorrect = userAnswer === currentQuestion?.correctAnswer;

  // Add a helper function to determine the category of a question
  const getQuestionCategory = (question: any) => {
    if (selectedCategory !== "All Categories") return selectedCategory;

    // Find which category this question belongs to
    for (const [category, questions] of Object.entries(questionsByCategory)) {
      if (
        questions.some((q) => q.id === question.id && q.text === question.text)
      ) {
        return category;
      }
    }
    return "Unknown";
  };

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
            <h2 className="text-2xl font-bold mb-2">
              {isPassed ? "Congratulations! You Passed" : "Test Failed"}
            </h2>
            <p className="text-muted-foreground">
              You scored {examResult.score} out of {examResult.total} (
              {Math.round(examResult.percentage)}%)
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Score</span>
              <span>{Math.round(examResult.percentage)}%</span>
            </div>
            <Progress value={examResult.percentage} className="h-2" />
          </div>

          {/* Question navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <span className="text-sm font-medium">
              Question {currentQuestionIndex + 1} of {currentQuestions.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextQuestion}
              disabled={currentQuestionIndex === currentQuestions.length - 1}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Question review - single question */}
          <div className="border rounded-md p-4">
            <div className="flex items-start gap-3 mb-4">
              {isCorrect ? (
                <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
              ) : (
                <XCircle className="h-6 w-6 text-destructive mt-0.5 flex-shrink-0" />
              )}
              <div>
                {selectedCategory === "All Categories" && (
                  <span className="text-xs font-medium text-muted-foreground block mb-1">
                    {getQuestionCategory(currentQuestion)}
                  </span>
                )}
                <p className="font-medium text-lg">{currentQuestion.text}</p>
              </div>
            </div>
            <div className="space-y-3 mt-4">
              {currentQuestion.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className={`p-3 rounded-md ${
                    optionIndex === currentQuestion.correctAnswer
                      ? "bg-primary/10 border border-primary/20"
                      : optionIndex === userAnswer
                      ? "bg-destructive/10 border border-destructive/20"
                      : "border"
                  }`}
                >
                  <div className="flex items-center">
                    <div className="flex-1">{option}</div>
                    {optionIndex === currentQuestion.correctAnswer && (
                      <span className="text-primary font-medium flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" /> Correct
                      </span>
                    )}
                    {optionIndex === userAnswer &&
                      optionIndex !== currentQuestion.correctAnswer && (
                        <span className="text-destructive font-medium flex items-center">
                          <XCircle className="h-4 w-4 mr-1" /> Your Answer
                        </span>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Question progress dots */}
          <div className="flex justify-center gap-1 flex-wrap">
            {currentQuestions.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentQuestionIndex
                    ? "bg-primary"
                    : userAnswers[index] ===
                      currentQuestions[index].correctAnswer
                    ? "bg-primary/40"
                    : "bg-destructive/40"
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
                aria-label={`Go to question ${index + 1}`}
              />
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
  );
}
