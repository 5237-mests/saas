"use client";

import { useRouter } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function MockTestHome() {
  const router = useRouter();
  const { selectedCategory, setSelectedCategory, resetExam } = useExam();
  const [categories, setCategories] = useState([]);

  // Move resetExam to useEffect to avoid state updates during render
  useEffect(() => {
    resetExam();
  }, [resetExam]);

  // Fetch categories when the component mounts
  useEffect(() => {
    // Fetch categories from the server
    fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories([{ id: "default", name: "All Categories" }, ...data]);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleStartTest = () => {
    if (selectedCategory) {
      router.push("/mock-test/start");
    }
  };

  const handleViewResults = () => {
    router.push("/mock-test/results");
  };
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Mock Driving Test</CardTitle>
          <CardDescription>
            Select a category and start your practice exam
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Select Category
            </label>
            <Select
              value={selectedCategory || ""}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category}>
                    {category.name}
                    {category.name === "All Categories" &&
                      " (Comprehensive Test)"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedCategory === "All Categories" && (
              <p className="text-xs text-muted-foreground mt-1">
                This test includes questions from all categories for a
                comprehensive assessment.
              </p>
            )}
          </div>

          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-medium mb-2">About Mock Tests</h3>
            <p className="text-sm text-muted-foreground">
              Our mock tests are designed to simulate the actual driving license
              exam. Each category contains questions specific to that area of
              knowledge. Complete the test to see your score and review correct
              answers.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleStartTest}
            className="w-full"
            disabled={!selectedCategory}
          >
            Start Test
          </Button>
          <Button
            onClick={handleViewResults}
            variant="outline"
            className="w-full"
          >
            View Past Results
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
