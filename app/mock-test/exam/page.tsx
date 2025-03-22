"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useExam } from "@/components/exam-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ExamPage() {
  const router = useRouter();
  const {
    selectedCategory,
    currentQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    userAnswers,
    setUserAnswer,
    examStarted,
    submitExam,
    timeRemaining,
    timeExpired,
  } = useExam();

  useEffect(() => {
    // Redirect if exam hasn't started or no category selected
    if (!examStarted || !selectedCategory) {
      router.push("/mock-test");
    }

    // If time expired, redirect to results
    if (timeExpired) {
      router.push("/mock-test/result");
    }
  }, [examStarted, selectedCategory, timeExpired, router]);
  const currentQuestion = currentQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;

  const handleNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    router.push("/mock-test/submit");
  };

  // Update the handleAnswerSelect function to automatically go to the next question
  // after selecting an answer
  const handleAnswerSelect = (value: string) => {
    setUserAnswer(currentQuestionIndex, Number.parseInt(value));

    // Automatically go to the next question if not on the last question
    if (currentQuestionIndex < currentQuestions.length - 1) {
      // Small delay to show the selection before moving to next question
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300);
    }
  };

  // Format time remaining as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Calculate time percentage for progress bar
  const totalTime = currentQuestions.length * 60; // 1 minute per question
  const timePercentage = (timeRemaining / totalTime) * 100;

  // Determine timer color based on time remaining
  const getTimerColor = () => {
    if (timePercentage > 50) return "bg-green-500";
    if (timePercentage > 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Check if time is running low (less than 30 seconds)
  const isTimeRunningLow = timeRemaining <= 30;

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto">
      {isTimeRunningLow && (
        <Alert variant="destructive" className="mb-4 animate-pulse">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Time is running out! The exam will be automatically submitted in{" "}
            {timeRemaining} seconds.
          </AlertDescription>
        </Alert>
      )}

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              {selectedCategory.name} Test
            </span>
            <span className="text-sm font-medium">
              Question {currentQuestionIndex + 1} of {currentQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />

          {/* Timer display */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span
                className={`font-mono text-lg font-bold ${
                  timeRemaining < 60 ? "text-red-500 animate-pulse" : ""
                }`}
              >
                {formatTime(timeRemaining)}
              </span>
            </div>
            <Progress
              value={timePercentage}
              className={`h-2 w-24 ${getTimerColor()}`}
            />
          </div>

          <CardTitle className="mt-4 text-xl">{currentQuestion.text}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={userAnswers[currentQuestionIndex]?.toString() || ""}
            onValueChange={handleAnswerSelect}
            className="space-y-3"
          >
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted"
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-grow cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-3">
            <Button
              onClick={handlePrevious}
              variant="outline"
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentQuestionIndex === currentQuestions.length - 1}
            >
              Next
            </Button>
          </div>
          <Button onClick={handleSubmit} variant="secondary">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
