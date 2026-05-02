import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    // Parse images JSON for client consumption
    const parsedProjects = projects.map((p) => ({
      ...p,
      images: p.images ? JSON.parse(p.images) : [],
    }));
    return NextResponse.json(parsedProjects);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;
  try {
    const body = await request.json();
    const project = await prisma.project.create({
      data: {
        title: body.title,
        description: body.description,
        image: body.image ?? "/placeholder.svg",
        images: body.images ? JSON.stringify(body.images) : null,
        techStack: body.techStack,
        githubUrl: body.githubUrl ?? null,
        demoUrl: body.demoUrl ?? null,
        featured: body.featured ?? false,
      },
    });
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/projects/[id]", "page");
    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}
