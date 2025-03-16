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
import { CheckCircle, Clock, FileQuestion } from "lucide-react";
import { questionsByCategory } from "@/lib/questions";

export default function StartTest() {
  const router = useRouter();
  const { selectedCategory, currentQuestions, startExam, examStarted } =
    useExam();

  useEffect(() => {
    // Redirect to home if no category is selected
    if (!selectedCategory) {
      router.push("/mock-test");
    }
  }, [selectedCategory, router]);

  // fetch the all question and or question by category
  const [questions, setQuestions] = useState(0);

  useEffect(() => {
    // fetch questions
    const questionres = () => {
      if (selectedCategory.name == "All Categories") {
        fetch("/api/questions")
          .then((res) => res.json())
          .then((data) => setQuestions(data.length))
          .catch((err) => console.log("first", err));
      } else {
        fetch(`/api/questions?categoryId=${selectedCategory.id}`)
          .then((res) => res.json())
          .then((data) => setQuestions(data.length))
          .catch((er) => console.log("first3", er));
      }
    };

    questionres();
  }, []);

  const handleBeginExam = () => {
    startExam();
    router.push("/mock-test/exam");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">
            {selectedCategory.name} Test
          </CardTitle>
          <CardDescription>
            Read the instructions before beginning
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex items-center gap-2">
              <FileQuestion className="h-5 w-5 text-primary" />
              {/* <span className="text-sm font-medium">
                {selectedCategory.name === "All Categories"
                  ? "10  (Mixed)" // Assuming 2 questions per category × 5 categories = 10 questions
                  : selectedCategory
                  ? questionsByCategory[selectedCategory]?.length || 0
                  : 0}{" "}
                Questions
              </span> */}
              <span className="text-sm font-medium">{questions} Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">
                {questions} Minutes Time Limit
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">70% Passing Score</span>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-medium mb-2">Exam Rules</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• You have 1 minute per question to complete the test.</li>
              <li>• The test will automatically submit when time runs out.</li>
              <li>
                • You can navigate between questions using the Next and Previous
                buttons.
              </li>
              <li>
                • You can change your answers at any time before submitting.
              </li>
              <li>
                • Once you submit the test, you cannot change your answers.
              </li>
              <li>
                • Your score and correct answers will be shown after submission.
              </li>
              <li>• You need to score at least 70% to pass the test.</li>
            </ul>
          </div>

          <div className="bg-primary/10 p-4 rounded-md">
            <h3 className="font-medium mb-2">Tips for Success</h3>
            <ul className="text-sm space-y-2">
              <li>• Read each question carefully before answering.</li>
              <li>
                • If you're unsure about an answer, you can come back to it
                later.
              </li>
              <li>
                • Manage your time wisely - don't spend too long on any single
                question.
              </li>
              <li>• You can pause the timer if you need a short break.</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleBeginExam} className="w-full">
            Begin Exam
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
