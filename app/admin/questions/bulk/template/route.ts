import { NextResponse } from "next/server"

export async function GET() {
  // Create a CSV template
  const csvContent = [
    "question,option_a,option_b,option_c,option_d,correct_answer",
    "What is the main function of an engine's radiator?,To increase engine power,To cool the engine,To filter the oil,To reduce noise,B",
    "What shape is a standard stop sign?,Circle,Triangle,Octagon,Rectangle,C",
    "What does a solid yellow line on the road indicate?,Passing is permitted,No passing zone,Pedestrian crossing ahead,Construction zone,B",
  ].join("\n")

  // Set headers for file download
  const headers = new Headers()
  headers.set("Content-Type", "text/csv")
  headers.set("Content-Disposition", 'attachment; filename="question_template.csv"')

  return new NextResponse(csvContent, {
    status: 200,
    headers,
  })
}

