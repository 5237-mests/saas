"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, AlertCircle, FileText, Check, FileUp } from "lucide-react"
import { categories } from "@/components/exam-context"

export default function BulkUploadPage() {
  const router = useRouter()
  const [category, setCategory] = useState("")
  const [bulkQuestions, setBulkQuestions] = useState("")
  const [uploadStatus, setUploadStatus] = useState<"idle" | "error" | "success">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [csvPreview, setCsvPreview] = useState<Array<any>>([])
  const [csvCategory, setCsvCategory] = useState("")

  const handleSubmit = () => {
    // Validate form
    if (!category || !bulkQuestions.trim()) {
      setUploadStatus("error")
      setErrorMessage("Please select a category and enter questions.")
      return
    }

    try {
      // Parse the bulk questions (this is a simplified example)
      // In a real app, you would have more robust parsing logic
      const lines = bulkQuestions.split("\n\n").filter((line) => line.trim())

      if (lines.length === 0) {
        setUploadStatus("error")
        setErrorMessage("No valid questions found. Please check the format.")
        return
      }

      const parsedQuestions = lines.map((block) => {
        const lines = block.split("\n").filter((line) => line.trim())
        if (lines.length < 3) {
          throw new Error("Each question must have a question text, options, and correct answer indicator.")
        }

        const questionText = lines[0]
        const options = lines.slice(1, -1).map((line) => line.replace(/^[A-D]\.\s*/, ""))
        const correctAnswerLine = lines[lines.length - 1]
        const correctAnswerMatch = correctAnswerLine.match(/Correct:\s*([A-D])/)

        if (!correctAnswerMatch) {
          throw new Error(`Could not determine correct answer for question: ${questionText}`)
        }

        const correctAnswerLetter = correctAnswerMatch[1]
        const correctAnswer = "ABCD".indexOf(correctAnswerLetter)

        if (correctAnswer === -1) {
          throw new Error(`Invalid correct answer indicator: ${correctAnswerLetter}`)
        }

        return {
          text: questionText,
          options,
          correctAnswer,
          category,
        }
      })

      // In a real app, this would call an API to save the questions
      console.log("Parsed questions:", parsedQuestions)

      setUploadStatus("success")

      // Navigate back to questions list after a short delay
      setTimeout(() => {
        router.push("/admin/questions")
      }, 2000)
    } catch (error) {
      setUploadStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Failed to parse questions. Please check the format.")
    }
  }

  const handleCsvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setCsvFile(file)

    // Read and preview the CSV file
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const csvText = event.target?.result as string
        const parsedData = parseCSV(csvText)

        if (parsedData.length > 0) {
          setCsvPreview(parsedData.slice(0, 5)) // Preview first 5 rows
        } else {
          throw new Error("No data found in CSV file")
        }

        setUploadStatus("idle")
      } catch (error) {
        setUploadStatus("error")
        setErrorMessage(error instanceof Error ? error.message : "Failed to parse CSV file")
        setCsvPreview([])
      }
    }

    reader.readAsText(file)
  }

  const parseCSV = (text: string): Array<any> => {
    // Simple CSV parser - in a production app, use a robust CSV library
    const lines = text.split("\n").filter((line) => line.trim())
    if (lines.length < 2) {
      throw new Error("CSV file must contain headers and at least one question")
    }

    const headers = lines[0].split(",").map((h) => h.trim())

    // Validate required headers
    const requiredHeaders = ["question", "option_a", "option_b", "option_c", "option_d", "correct_answer"]
    const missingHeaders = requiredHeaders.filter((h) => !headers.includes(h))

    if (missingHeaders.length > 0) {
      throw new Error(`CSV is missing required headers: ${missingHeaders.join(", ")}`)
    }

    return lines.slice(1).map((line) => {
      const values = line.split(",").map((v) => v.trim())

      // Create an object mapping headers to values
      const row: Record<string, string> = {}
      headers.forEach((header, index) => {
        row[header] = values[index] || ""
      })

      return row
    })
  }

  const handleCsvUpload = () => {
    if (!csvCategory || !csvFile) {
      setUploadStatus("error")
      setErrorMessage("Please select a category and upload a CSV file.")
      return
    }

    try {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const csvText = event.target?.result as string
          const parsedData = parseCSV(csvText)

          if (parsedData.length === 0) {
            throw new Error("No questions found in CSV file")
          }

          // Transform CSV data to question objects
          const questions = parsedData.map((row, index) => {
            // Validate required fields
            if (!row.question || !row.option_a || !row.option_b || !row.correct_answer) {
              throw new Error(`Row ${index + 2}: Missing required fields`)
            }

            // Validate correct_answer format
            const correctAnswer = row.correct_answer.toUpperCase()
            if (!["A", "B", "C", "D"].includes(correctAnswer)) {
              throw new Error(
                `Row ${index + 2}: Invalid correct answer '${row.correct_answer}'. Must be A, B, C, or D.`,
              )
            }

            // Create question object
            return {
              text: row.question,
              options: [row.option_a, row.option_b, row.option_c || "", row.option_d || ""].filter(Boolean), // Remove empty options
              correctAnswer: "ABCD".indexOf(correctAnswer),
              category: csvCategory,
            }
          })

          // In a real app, this would call an API to save the questions
          console.log("Parsed questions from CSV:", questions)

          setUploadStatus("success")

          // Navigate back to questions list after a short delay
          setTimeout(() => {
            router.push("/admin/questions")
          }, 2000)
        } catch (error) {
          setUploadStatus("error")
          setErrorMessage(error instanceof Error ? error.message : "Failed to process CSV file")
        }
      }

      reader.readAsText(csvFile)
    } catch (error) {
      setUploadStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Failed to read CSV file")
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Bulk Upload Questions</h1>

      <Tabs defaultValue="text">
        <TabsList className="mb-6">
          <TabsTrigger value="text">Text Format</TabsTrigger>
          <TabsTrigger value="csv">CSV Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="text">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Format Instructions</CardTitle>
              <CardDescription>
                Follow the format below to bulk upload questions. Each question should be separated by a blank line.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-md font-mono text-sm">
                  <p>Question text goes here?</p>
                  <p>A. First option</p>
                  <p>B. Second option</p>
                  <p>C. Third option</p>
                  <p>D. Fourth option</p>
                  <p>Correct: B</p>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    Make sure to indicate the correct answer with "Correct: X" where X is the option letter (A, B, C, or
                    D).
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upload Questions</CardTitle>
              <CardDescription>Select a category and paste your questions below.</CardDescription>
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
                <Label htmlFor="questions">Questions</Label>
                <Textarea
                  id="questions"
                  value={bulkQuestions}
                  onChange={(e) => setBulkQuestions(e.target.value)}
                  placeholder="Paste your questions here..."
                  className="min-h-[300px] font-mono"
                />
              </div>

              {uploadStatus === "error" && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              {uploadStatus === "success" && (
                <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
                  <Check className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>Questions uploaded successfully! Redirecting...</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/admin/questions")}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Questions
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="csv">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>CSV Format Instructions</CardTitle>
              <CardDescription>Upload questions using a CSV file with the required columns.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                  <p>question,option_a,option_b,option_c,option_d,correct_answer</p>
                  <p>
                    What is the main function of an engine's radiator?,To increase engine power,To cool the engine,To
                    filter the oil,To reduce noise,B
                  </p>
                  <p>What shape is a standard stop sign?,Circle,Triangle,Octagon,Rectangle,C</p>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Required Columns</AlertTitle>
                  <AlertDescription>
                    <p>Your CSV file must include these columns:</p>
                    <ul className="list-disc list-inside mt-2">
                      <li>question - The question text</li>
                      <li>option_a - First answer option</li>
                      <li>option_b - Second answer option</li>
                      <li>option_c - Third answer option (optional)</li>
                      <li>option_d - Fourth answer option (optional)</li>
                      <li>correct_answer - The letter of the correct option (A, B, C, or D)</li>
                    </ul>
                  </AlertDescription>
                </Alert>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" asChild>
                    <a href="/admin/questions/bulk/template" download>
                      <FileText className="mr-2 h-4 w-4" />
                      Download Template
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upload CSV File</CardTitle>
              <CardDescription>Select a category and upload your CSV file.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="csv-category">Category</Label>
                <Select value={csvCategory} onValueChange={setCsvCategory}>
                  <SelectTrigger id="csv-category">
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
                <Label htmlFor="csv-file">CSV File</Label>
                <div className="flex items-center gap-2">
                  <Input id="csv-file" type="file" accept=".csv" onChange={handleCsvFileChange} className="flex-1" />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setCsvFile(null)
                      setCsvPreview([])
                      const fileInput = document.getElementById("csv-file") as HTMLInputElement
                      if (fileInput) fileInput.value = ""
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </div>

              {csvPreview.length > 0 && (
                <div className="space-y-2">
                  <Label>CSV Preview (First 5 rows)</Label>
                  <div className="border rounded-md overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {Object.keys(csvPreview[0]).map((header) => (
                            <th
                              key={header}
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {csvPreview.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {Object.values(row).map((cell, cellIndex) => (
                              <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {String(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {uploadStatus === "error" && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              {uploadStatus === "success" && (
                <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
                  <Check className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>Questions uploaded successfully! Redirecting...</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/admin/questions")}>
                Cancel
              </Button>
              <Button onClick={handleCsvUpload} disabled={!csvFile || !csvCategory}>
                <FileUp className="mr-2 h-4 w-4" />
                Upload CSV
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

