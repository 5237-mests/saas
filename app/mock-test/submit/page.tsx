"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
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
import { CheckCircle, AlertCircle } from "lucide-react";

export default function SubmitPage() {
  const router = useRouter();
  const {
    selectedCategory,
    currentQuestions,
    userAnswers,
    submitExam,
    examStarted,
  } = useExam();

  useEffect(() => {
    // Redirect if exam hasn't started or no category selected
    if (!examStarted || !selectedCategory) {
      router.push("/mock-test");
    }
  }, [examStarted, selectedCategory, router]);

  const answeredCount = userAnswers.filter((answer) => answer !== null).length;
  const unansweredCount = currentQuestions.length - answeredCount;
  const progressPercentage = (answeredCount / currentQuestions.length) * 100;

  const handleSubmitTest = () => {
    submitExam();
    router.push("/mock-test/result");
  };

  const handleReturnToExam = () => {
    router.push("/mock-test/exam");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Submit Your Test</CardTitle>
          <CardDescription>
            Review your progress before final submission
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-medium mb-2">
              {selectedCategory.name} Test
            </h3>
            <p className="text-muted-foreground">
              You have answered {answeredCount} out of {currentQuestions.length}{" "}
              questions.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-muted p-4 rounded-md flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Answered</h4>
                <p className="text-sm text-muted-foreground">
                  {answeredCount} questions
                </p>
              </div>
            </div>
            <div className="bg-muted p-4 rounded-md flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Unanswered</h4>
                <p className="text-sm text-muted-foreground">
                  {unansweredCount} questions
                </p>
              </div>
            </div>
          </div>

          {unansweredCount > 0 && (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
              <p className="text-sm text-amber-800">
                You have {unansweredCount} unanswered questions. You can go back
                to complete them or submit your test as is.
              </p>
            </div>
          )}

          <div className="bg-primary/10 p-4 rounded-md">
            <h3 className="font-medium mb-2">Important Note</h3>
            <p className="text-sm">
              Once you submit your test, you will not be able to change your
              answers. Your results will be displayed immediately after
              submission.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button onClick={handleSubmitTest} className="w-full">
            Submit Test
          </Button>
          <Button
            onClick={handleReturnToExam}
            variant="outline"
            className="w-full"
          >
            Return to Exam
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
