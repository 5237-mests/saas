import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // params from request
  // http://localhost:3000/api/questions?categoryId=11d02317-2414-46fe-bf8f-d76eea5b1fbb
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId");
  const questions = await prisma.question.findMany({
    where: {
      categoryId: categoryId,
    },
  });
  return NextResponse.json(questions);
}
