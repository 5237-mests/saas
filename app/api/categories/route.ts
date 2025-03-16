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

// POST category
export async function POST(req: Request) {
  try {
    // Parse the request body
    const { name } = await req.json();

    // Validate the input
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // Create a new category in the database
    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    // Return the created category as JSON
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Error creating category" },
      { status: 500 }
    );
  }
}

// DELETE category
export async function DELETE(req: Request) {
  try {
    // Parse the request body to get the category ID
    const { id } = await req.json();

    // Validate the input
    if (!id) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    // Delete the category from the database
    await prisma.category.delete({
      where: {
        id,
      },
    });

    // Return a success response
    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Error deleting category" },
      { status: 500 }
    );
  }
}

// PATCH (update) category
export async function PATCH(req: Request) {
  try {
    // Parse the request body to get the category ID and new data
    const { id, name } = await req.json();

    // Validate the input
    if (!id || !name) {
      return NextResponse.json(
        { error: "Category ID and name are required" },
        { status: 400 }
      );
    }

    // Update the category in the database
    const updatedCategory = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    // Return the updated category as JSON
    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Error updating category" },
      { status: 500 }
    );
  }
}
