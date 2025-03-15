import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { studentId, testId, score } = await req.json();

  const result = await prisma.testResult.create({
    data: { studentId, testId, score },
  });

  return NextResponse.json(result);
}
