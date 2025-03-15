// app/api/categories/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Assuming you have your prisma client setup

// GET endpoint to fetch categories
export async function GET() {
  try {
    // Fetch all categories from the Category model
    const categories = await prisma.category.findMany();

    // Return the categories as JSON
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Error fetching categories" },
      { status: 500 }
    );
  }
}
