"use client";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useCallback,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";

// Define question type
export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

// Define the context type
interface ExamContextType {
  selectedCategory: string | null;
  setSelectedCategory: (category: string) => void;
  currentQuestions: Question[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  userAnswers: (number | null)[];
  setUserAnswer: (questionIndex: number, answerIndex: number) => void;
  startExam: () => void;
  submitExam: () => void;
  examStarted: boolean;
  examSubmitted: boolean;
  examResult: {
    score: number;
    total: number;
    percentage: number;
  } | null;
  resetExam: () => void;
  // Timer related properties
  timeRemaining: number;
  timeExpired: boolean;
}

// Create the context
const ExamContext = createContext<ExamContextType | undefined>(undefined);

// Create provider component
export function ExamProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [examStarted, setExamStarted] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examResult, setExamResult] = useState<{
    score: number;
    total: number;
    percentage: number;
  } | null>(null);

  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timeExpired, setTimeExpired] = useState(false);

  // Start the exam with the selected category
  const startExam = useCallback(() => {
    if (selectedCategory) {
      if (selectedCategory.name === "All Categories") {
        fetch("/api/questions")
          .then((res) => res.json())
          .then((data) => {
            setCurrentQuestions(data);
            setTimeRemaining(data.length * 60);
          })
          .catch((error) => console.log("Error: ", error));
      } else {
        // For specific categories, use all questions from that category
        fetch(`/api/questions/?categoryId=${selectedCategory.id}`)
          .then((res) => res.json())
          .then((data) => {
            setCurrentQuestions(data);
            setTimeRemaining(data.length * 60);
          })
          .catch((error) => console.log("Error: ", error));
      }
      // setUserAnswers(new Array(questions.length).fill(null));
      setCurrentQuestionIndex(0);
      setExamStarted(true);
      setExamSubmitted(false);
      setExamResult(null);
    }
  }, [selectedCategory]);

  // Set user answer for a specific question
  const setUserAnswer = useCallback(
    (questionIndex: number, answerIndex: number) => {
      setUserAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[questionIndex] = answerIndex;
        return newAnswers;
      });
    },
    []
  );

  // Submit the exam and calculate results
  const submitExam = useCallback(() => {
    let score = 0;
    currentQuestions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        score++;
      }
    });

    setExamResult({
      score,
      total: currentQuestions.length,
      percentage: (score / currentQuestions.length) * 100,
    });
    setExamSubmitted(true);
  }, [currentQuestions, userAnswers]);

  // Reset the exam
  const resetExam = useCallback(() => {
    setSelectedCategory(null);
    setCurrentQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setExamStarted(false);
    setExamSubmitted(false);
    setExamResult(null);
    setTimeRemaining(0);
    setTimeExpired(false);
  }, []);

  // Handle time expiration
  useEffect(() => {
    if (timeExpired && !examSubmitted) {
      submitExam();
      router.push("/mock-test/result");
    }
  }, [timeExpired, examSubmitted, submitExam, router]);

  // Timer effect
  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    if (examStarted && !examSubmitted && timeRemaining > 0) {
      timerId = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Time's up, mark as expired
            setTimeExpired(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [examStarted, examSubmitted, timeRemaining]);

  return (
    <ExamContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        currentQuestions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        userAnswers,
        setUserAnswer,
        startExam,
        submitExam,
        examStarted,
        examSubmitted,
        examResult,
        resetExam,
        timeRemaining,
        timeExpired,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
}

// Custom hook to use the exam context
export function useExam() {
  const context = useContext(ExamContext);
  if (context === undefined) {
    throw new Error("useExam must be used within an ExamProvider");
  }
  return context;
}
