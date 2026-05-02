import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteImage } from "@/lib/upload";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const DEFAULT_PROJECT_IMAGE = "/placeholder.svg";

function shouldDeleteProjectImage(url: string | null | undefined) {
  return (
    !!url &&
    url !== DEFAULT_PROJECT_IMAGE &&
    url.includes("/storage/v1/object/public/")
  );
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authError = await requireAuth(request);
  if (authError) return authError;
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authError = await requireAuth(request);
  if (authError) return authError;
  try {
    const { id } = await params;
    const body = await request.json();
    const existing = await prisma.project.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const nextImage = body.image ?? existing.image;
    const project = await prisma.project.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        image: nextImage,
        techStack: body.techStack,
        githubUrl: body.githubUrl ?? null,
        demoUrl: body.demoUrl ?? null,
        featured: body.featured ?? false,
      },
    });

    if (
      nextImage !== existing.image &&
      shouldDeleteProjectImage(existing.image)
    ) {
      const result = await deleteImage(existing.image);
      if (result.error) {
        console.error("Failed to delete previous project image:", result.error);
      }
    }

    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/projects/[id]", "page");
    return NextResponse.json(project);
  } catch {
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authError = await requireAuth(request);
  if (authError) return authError;
  try {
    const { id } = await params;
    const existing = await prisma.project.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await prisma.project.delete({ where: { id } });

    if (shouldDeleteProjectImage(existing.image)) {
      const result = await deleteImage(existing.image);
      if (result.error) {
        console.error("Failed to delete project image:", result.error);
      }
    }

    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/projects/[id]", "page");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 },
    );
  }
}
