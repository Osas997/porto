import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(projects)
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const project = await prisma.project.create({
      data: {
        title: body.title,
        description: body.description,
        image: body.image ?? "/placeholder.svg",
        techStack: body.techStack,
        githubUrl: body.githubUrl ?? null,
        demoUrl: body.demoUrl ?? null,
        featured: body.featured ?? false,
      },
    })
    return NextResponse.json(project, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    )
  }
}
