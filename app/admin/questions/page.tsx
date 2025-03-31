"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Trash2, Upload, Plus } from "lucide-react"
import { categories } from "@/components/exam-context"
import { questionsByCategory } from "@/lib/questions"

export default function QuestionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [questionToDelete, setQuestionToDelete] = useState<{ category: string; index: number } | null>(null)

  // Flatten questions for display
  const allQuestions = Object.entries(questionsByCategory).flatMap(([category, questions]) =>
    questions.map((question) => ({ ...question, category })),
  )

  // Filter questions based on category and search query
  const filteredQuestions = allQuestions.filter((question) => {
    const matchesCategory = !selectedCategory || question.category === selectedCategory
    const matchesSearch =
      !searchQuery ||
      question.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.options.some((option) => option.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  const handleDeleteQuestion = () => {
    if (questionToDelete) {
      // In a real app, this would call an API to delete the question
      console.log(`Deleting question ${questionToDelete.index} from ${questionToDelete.category}`)
      setIsDeleteDialogOpen(false)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Questions</h1>
        <div className="flex gap-2">
          <Link href="/admin/questions/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </Link>
          <Link href="/admin/questions/bulk">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Bulk Upload
              <span className="ml-1 text-xs">(Text or CSV)</span>
            </Button>
          </Link>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter Questions</CardTitle>
          <CardDescription>Use the filters below to find specific questions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3">
              <Select onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories
                    .filter((cat) => cat !== "All Categories")
                    .map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-2/3">
              <Input
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Questions</CardTitle>
          <CardDescription>
            View, edit, or delete exam questions. {filteredQuestions.length} questions found.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Options</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuestions.map((question, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium max-w-md truncate">{question.text}</TableCell>
                  <TableCell>{question.category}</TableCell>
                  <TableCell>{question.options.length} options</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link href={`/admin/questions/edit/${question.id}`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setQuestionToDelete({ category: question.category, index: question.id })
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete Question Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Question</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this question? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteQuestion}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

