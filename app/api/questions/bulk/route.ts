import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Readable } from "stream";
import Papa from "papaparse";

// POST endpoint to create bulk questions from a CSV file with categoryId in the request body
export async function POST(req: Request) {
  try {
    // Parse the request body (form data)
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const categoryId = formData.get("categoryId") as string;

    // Validate the input
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    if (!categoryId) {
      return NextResponse.json(
        { error: "categoryId is required" },
        { status: 400 }
      );
    }

    // Convert the file to a readable stream
    const stream = Readable.from(Buffer.from(await file.arrayBuffer()));

    // Parse the CSV file
    const csvData = await new Promise<any[]>((resolve, reject) => {
      const results: any[] = [];
      Papa.parse(stream, {
        header: true, // Use the first row as headers
        skipEmptyLines: true,
        complete: (result) => {
          resolve(result.data);
        },
        error: (error) => {
          reject(error);
        },
      });
    });

    // Validate and transform the CSV data
    const questions = csvData.map((row) => {
      // Validate required fields
      if (
        !row.question ||
        !row.option_a ||
        !row.option_b ||
        !row.option_c ||
        !row.option_d ||
        !row.correct_answer
      ) {
        throw new Error(
          "Each row must contain question, option_a, option_b, option_c, option_d, and correct_answer"
        );
      }

      // Map correct_answer (A, B, C, D) to an index (0, 1, 2, 3)
      const correctAnswerMap = { A: 0, B: 1, C: 2, D: 3 };
      const correctAnswer = correctAnswerMap[row.correct_answer.toUpperCase()];

      if (correctAnswer === undefined) {
        throw new Error("correct_answer must be A, B, C, or D");
      }

      // Transform the row into the Question model structure
      return {
        text: row.question,
        options: [row.option_a, row.option_b, row.option_c, row.option_d],
        correctAnswer,
        categoryId, // Use the categoryId from the request body
      };
    });

    // Insert the questions into the database
    await prisma.question.createMany({
      data: questions,
    });

    // Return a success response
    return NextResponse.json(
      { message: "Bulk questions created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating bulk questions:", error);
    return NextResponse.json(
      { error: error.message || "Error creating bulk questions" },
      { status: 500 }
    );
  }
}
