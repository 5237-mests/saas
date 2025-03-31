"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Plus, Trash2, Save } from "lucide-react"
import { categories } from "@/components/exam-context"

export default function NewQuestionPage() {
  const router = useRouter()
  const [category, setCategory] = useState("")
  const [questionText, setQuestionText] = useState("")
  const [options, setOptions] = useState(["", "", "", ""])
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null)

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const addOption = () => {
    setOptions([...options, ""])
  }

  const removeOption = (index: number) => {
    if (options.length <= 2) return // Minimum 2 options

    const newOptions = options.filter((_, i) => i !== index)
    setOptions(newOptions)

    // Adjust correctAnswer if needed
    if (correctAnswer === index) {
      setCorrectAnswer(null)
    } else if (correctAnswer !== null && correctAnswer > index) {
      setCorrectAnswer(correctAnswer - 1)
    }
  }

  const handleSubmit = () => {
    // Validate form
    if (!category || !questionText || options.some((opt) => !opt.trim()) || correctAnswer === null) {
      alert("Please fill in all fields and select a correct answer.")
      return
    }

    // In a real app, this would call an API to save the question
    console.log({
      category,
      text: questionText,
      options,
      correctAnswer,
    })

    // Navigate back to questions list
    router.push("/admin/questions")
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Question</h1>

      <Card>
        <CardHeader>
          <CardTitle>Question Details</CardTitle>
          <CardDescription>Fill in the details for the new exam question.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter((cat) => cat !== "All Categories")
                  .map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="question">Question Text</Label>
            <Textarea
              id="question"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Enter the question text..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Answer Options</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addOption}
                disabled={options.length >= 6} // Maximum 6 options
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Option
              </Button>
            </div>

            <RadioGroup
              value={correctAnswer?.toString() || ""}
              onValueChange={(value) => setCorrectAnswer(Number.parseInt(value))}
            >
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <div className="flex-1">
                    <Input
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(index)}
                    disabled={options.length <= 2} // Minimum 2 options
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </RadioGroup>
            <p className="text-sm text-muted-foreground">Select the radio button next to the correct answer.</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/admin/questions")}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="mr-2 h-4 w-4" />
            Save Question
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

