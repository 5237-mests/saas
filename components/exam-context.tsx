"use client";

import { error } from "console";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useCallback,
} from "react";

// Define question type
export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

// Define exam categories
// fetch categories from db
export const categories = [
  "All Categories",
  "Engine",
  "Electrical",
  "Traffic Rules",
  "Road Signs",
  "Safety Procedures",
];

// Sample questions for each category
const questionsByCategory: Record<string, Question[]> = {
  Engine: [
    {
      id: 1,
      text: "What is the main function of an engine's radiator?",
      options: [
        "To increase engine power",
        "To cool the engine",
        "To filter the oil",
        "To reduce noise",
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      text: "Which component is responsible for converting fuel into mechanical energy?",
      options: ["Transmission", "Alternator", "Engine", "Differential"],
      correctAnswer: 2,
    },
    {
      id: 3,
      text: "What does RPM stand for in engine terminology?",
      options: [
        "Rotations Per Mile",
        "Revolutions Per Minute",
        "Rear Power Module",
        "Rapid Performance Motor",
      ],
      correctAnswer: 1,
    },
    {
      id: 4,
      text: "What is the purpose of a catalytic converter?",
      options: [
        "To increase fuel efficiency",
        "To reduce harmful emissions",
        "To boost engine power",
        "To filter engine oil",
      ],
      correctAnswer: 1,
    },
    {
      id: 5,
      text: "Which of these is NOT a type of engine?",
      options: [
        "Diesel engine",
        "Rotary engine",
        "Magnetic engine",
        "Electric engine",
      ],
      correctAnswer: 2,
    },
  ],
  Electrical: [
    {
      id: 1,
      text: "What component generates electricity in a car?",
      options: ["Battery", "Alternator", "Spark plug", "Fuse box"],
      correctAnswer: 1,
    },
    {
      id: 2,
      text: "What is the purpose of a car's battery?",
      options: [
        "To power the radio only",
        "To start the engine and power electrical systems",
        "To cool the engine",
        "To filter the air",
      ],
      correctAnswer: 1,
    },
    {
      id: 3,
      text: "What happens when a fuse blows in a car?",
      options: [
        "The engine stops immediately",
        "The specific electrical circuit stops working",
        "The car accelerates uncontrollably",
        "The battery recharges automatically",
      ],
      correctAnswer: 1,
    },
    {
      id: 4,
      text: "What do spark plugs do in a gasoline engine?",
      options: [
        "Filter the fuel",
        "Ignite the fuel-air mixture",
        "Increase battery power",
        "Reduce engine temperature",
      ],
      correctAnswer: 1,
    },
    {
      id: 5,
      text: "What is the function of the alternator belt?",
      options: [
        "To connect the wheels",
        "To drive the alternator from the engine",
        "To open and close valves",
        "To adjust seat position",
      ],
      correctAnswer: 1,
    },
  ],
  "Traffic Rules": [
    {
      id: 1,
      text: "What does a solid yellow line on the road indicate?",
      options: [
        "Passing is permitted",
        "No passing zone",
        "Pedestrian crossing ahead",
        "Construction zone",
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      text: "What is the proper action at a four-way stop?",
      options: [
        "The vehicle on the right has the right of way",
        "The largest vehicle goes first",
        "The first vehicle to arrive proceeds first",
        "All vehicles proceed simultaneously",
      ],
      correctAnswer: 2,
    },
    {
      id: 3,
      text: "When should you use your high beam headlights?",
      options: [
        "In heavy traffic",
        "In fog or heavy rain",
        "When following another vehicle closely",
        "On dark roads with no oncoming traffic",
      ],
      correctAnswer: 3,
    },
    {
      id: 4,
      text: "What is the proper following distance in good conditions?",
      options: [
        "1 second behind the vehicle ahead",
        "At least 2 seconds behind the vehicle ahead",
        "As close as possible to the vehicle ahead",
        "At least 10 car lengths",
      ],
      correctAnswer: 1,
    },
    {
      id: 5,
      text: "When approaching a school bus with flashing red lights, you must:",
      options: [
        "Slow down and proceed with caution",
        "Stop only if children are visible",
        "Stop and remain stopped until the lights stop flashing",
        "Change lanes and pass slowly",
      ],
      correctAnswer: 2,
    },
  ],
  "Road Signs": [
    {
      id: 1,
      text: "What shape is a standard stop sign?",
      options: ["Circle", "Triangle", "Octagon", "Rectangle"],
      correctAnswer: 2,
    },
    {
      id: 2,
      text: "What does a yellow diamond-shaped sign indicate?",
      options: [
        "Stop ahead",
        "Warning or hazard ahead",
        "Speed limit",
        "Construction zone",
      ],
      correctAnswer: 1,
    },
    {
      id: 3,
      text: "What color are guide signs on highways?",
      options: ["Red", "Yellow", "Green", "Orange"],
      correctAnswer: 2,
    },
    {
      id: 4,
      text: "What does a sign with a red circle and slash mean?",
      options: [
        "Danger ahead",
        "No entry or prohibited action",
        "Railroad crossing",
        "Construction zone",
      ],
      correctAnswer: 1,
    },
    {
      id: 5,
      text: "What does a pentagonal sign indicate?",
      options: [
        "School zone",
        "Hospital nearby",
        "Wildlife crossing",
        "Recreational area",
      ],
      correctAnswer: 0,
    },
  ],
  "Safety Procedures": [
    {
      id: 1,
      text: "What should you check first before starting your vehicle?",
      options: [
        "Radio settings",
        "Seat position and mirrors",
        "Fuel level",
        "Tire pressure",
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      text: "What is the proper hand position on the steering wheel?",
      options: [
        "One hand at 12 o'clock",
        "Both hands at the bottom of the wheel",
        "9 and 3 o'clock positions",
        "One hand at 6 o'clock",
      ],
      correctAnswer: 2,
    },
    {
      id: 3,
      text: "When should you use your hazard lights?",
      options: [
        "When driving in heavy rain",
        "When your vehicle is disabled or stopped in a hazardous location",
        "When changing lanes",
        "When parking normally",
      ],
      correctAnswer: 1,
    },
    {
      id: 4,
      text: "What should you do if your vehicle starts to skid?",
      options: [
        "Brake hard immediately",
        "Turn the steering wheel in the opposite direction of the skid",
        "Steer in the direction you want to go and avoid sudden braking",
        "Accelerate to regain control",
      ],
      correctAnswer: 2,
    },
    {
      id: 5,
      text: "What is the first thing you should do at the scene of an accident?",
      options: [
        "Call your insurance company",
        "Take photos of the damage",
        "Ensure safety and check for injuries",
        "Exchange information with other drivers",
      ],
      correctAnswer: 2,
    },
  ],
};

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
}

// Create the context
const ExamContext = createContext<ExamContextType | undefined>(undefined);

// Create provider component
export function ExamProvider({ children }: { children: ReactNode }) {
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

  // Start the exam with the selected category
  const startExam = useCallback(() => {
    if (selectedCategory) {
      let questions;

      if (selectedCategory.name === "All Categories") {
        // For "All Categories", take a subset of questions from each category
        // const questionsPerCategory = 2; // Take 2 questions from each category for a balanced test
        // Object.values(questionsByCategory).forEach((categoryQuestions) => {
        //   // Get random questions from each category
        //   const randomQuestions = [...categoryQuestions]
        //     .sort(() => 0.5 - Math.random())
        //     .slice(0, questionsPerCategory);
        //   questions = [...questions, ...randomQuestions];
        // });
        fetch("/api/questions")
          .then((res) => res.json())
          .then((data) => (questions = data))
          .catch((error) => console.log("Error: ", error));
      } else {
        // For specific categories, use all questions from that category
        fetch(`/api/questions/?categoryId=${selectedCategory.id}`)
          .then((res) => res.json())
          .then((data) => setCurrentQuestions(data))
          .catch((error) => console.log("Error: ", error));
      }
      console.log("from callback", questions);
      // setCurrentQuestions(questions);
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
  }, []);

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
