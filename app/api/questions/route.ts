// // import prisma from "@/lib/prisma";
// // import { NextResponse } from "next/server";

// // export async function GET(req: Request) {
// //   // params from request
// //   // http://localhost:3000/api/questions?categoryId=11d02317-2414-46fe-bf8f-d76eea5b1fbb
// //   const { searchParams } = new URL(req.url);
// //   const categoryId = searchParams.get("categoryId");
// //   const questions = categoryId
// //     ? await prisma.question.findMany({
// //         where: { categoryId },
// //       })
// //     : await prisma.question.findMany();
// //   return NextResponse.json(questions);
// // }

// import prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";

// // GET endpoint to fetch questions
// export async function GET(req: Request) {
//   try {
//     // Extract query parameters from the request URL
//     const { searchParams } = new URL(req.url);
//     const categoryId = searchParams.get("categoryId");

//     // Fetch questions based on the categoryId (if provided)
//     const questions = categoryId
//       ? await prisma.question.findMany({
//           where: { categoryId },
//         })
//       : await prisma.question.findMany();

//     // Return the questions as JSON
//     return NextResponse.json(questions);
//   } catch (error) {
//     console.error("Error fetching questions:", error);
//     return NextResponse.json(
//       { error: "Error fetching questions" },
//       { status: 500 }
//     );
//   }
// }

// // POST endpoint to create a new question
// export async function POST(req: Request) {
//   try {
//     // Parse the request body
//     const { text, categoryId } = await req.json();

//     // Validate the input
//     if (!text || !categoryId) {
//       return NextResponse.json(
//         { error: "Text and categoryId are required" },
//         { status: 400 }
//       );
//     }

//     // Create a new question in the database
//     const question = await prisma.question.create({
//       data: {
//         text,
//         categoryId,
//       },
//     });

//     // Return the created question as JSON
//     return NextResponse.json(question, { status: 201 });
//   } catch (error) {
//     console.error("Error creating question:", error);
//     return NextResponse.json(
//       { error: "Error creating question" },
//       { status: 500 }
//     );
//   }
// }

// // PATCH (update) endpoint to update a question
// export async function PATCH(req: Request) {
//   try {
//     // Parse the request body
//     const { id, text, categoryId } = await req.json();

//     // Validate the input
//     if (!id || !text || !categoryId) {
//       return NextResponse.json(
//         { error: "ID, text, and categoryId are required" },
//         { status: 400 }
//       );
//     }

//     // Update the question in the database
//     const updatedQuestion = await prisma.question.update({
//       where: { id },
//       data: {
//         text,
//         categoryId,
//       },
//     });

//     // Return the updated question as JSON
//     return NextResponse.json(updatedQuestion, { status: 200 });
//   } catch (error) {
//     console.error("Error updating question:", error);
//     return NextResponse.json(
//       { error: "Error updating question" },
//       { status: 500 }
//     );
//   }
// }

// // DELETE endpoint to delete a question
// export async function DELETE(req: Request) {
//   try {
//     // Parse the request body
//     const { id } = await req.json();

//     // Validate the input
//     if (!id) {
//       return NextResponse.json(
//         { error: "Question ID is required" },
//         { status: 400 }
//       );
//     }

//     // Delete the question from the database
//     await prisma.question.delete({
//       where: { id },
//     });

//     // Return a success response
//     return NextResponse.json(
//       { message: "Question deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting question:", error);
//     return NextResponse.json(
//       { error: "Error deleting question" },
//       { status: 500 }
//     );
//   }
// }

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET endpoint to fetch questions
export async function GET(req: Request) {
  try {
    // Extract query parameters from the request URL
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");

    // Fetch questions based on the categoryId (if provided)
    const questions = categoryId
      ? await prisma.question.findMany({
          where: { categoryId },
          include: { category: true }, // Include the related category
        })
      : await prisma.question.findMany({
          include: { category: true }, // Include the related category
        });

    // Return the questions as JSON
    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { error: "Error fetching questions" },
      { status: 500 }
    );
  }
}

// POST endpoint to create a new question
export async function POST(req: Request) {
  try {
    // Parse the request body
    const { text, options, correctAnswer, categoryId } = await req.json();

    // Validate the input
    if (!text || !options || correctAnswer === undefined || !categoryId) {
      return NextResponse.json(
        { error: "Text, options, correctAnswer, and categoryId are required" },
        { status: 400 }
      );
    }

    // Create a new question in the database
    const question = await prisma.question.create({
      data: {
        text,
        options,
        correctAnswer,
        categoryId,
      },
      include: { category: true }, // Include the related category in the response
    });

    // Return the created question as JSON
    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    console.error("Error creating question:", error);
    return NextResponse.json(
      { error: "Error creating question" },
      { status: 500 }
    );
  }
}

// PATCH (update) endpoint to update a question
export async function PATCH(req: Request) {
  try {
    // Parse the request body
    const { id, text, options, correctAnswer, categoryId } = await req.json();

    // Validate the input
    if (
      !id ||
      !text ||
      !options ||
      correctAnswer === undefined ||
      !categoryId
    ) {
      return NextResponse.json(
        {
          error:
            "ID, text, options, correctAnswer, and categoryId are required",
        },
        { status: 400 }
      );
    }

    // Update the question in the database
    const updatedQuestion = await prisma.question.update({
      where: { id },
      data: {
        text,
        options,
        correctAnswer,
        categoryId,
      },
      include: { category: true }, // Include the related category in the response
    });

    // Return the updated question as JSON
    return NextResponse.json(updatedQuestion, { status: 200 });
  } catch (error) {
    console.error("Error updating question:", error);
    return NextResponse.json(
      { error: "Error updating question" },
      { status: 500 }
    );
  }
}

// DELETE endpoint to delete a question
export async function DELETE(req: Request) {
  try {
    // Parse the request body
    const { id } = await req.json();

    // Validate the input
    if (!id) {
      return NextResponse.json(
        { error: "Question ID is required" },
        { status: 400 }
      );
    }

    // Delete the question from the database
    await prisma.question.delete({
      where: { id },
    });

    // Return a success response
    return NextResponse.json(
      { message: "Question deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting question:", error);
    return NextResponse.json(
      { error: "Error deleting question" },
      { status: 500 }
    );
  }
}
