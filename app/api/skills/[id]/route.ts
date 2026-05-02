import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteImage } from "@/lib/upload";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

function shouldDeleteSkillLogo(url: string | null | undefined) {
  return !!url && url.includes("/storage/v1/object/public/");
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authError = await requireAuth(request);
  if (authError) return authError;
  try {
    const { id } = await params;
    const skill = await prisma.skill.findUnique({ where: { id } });
    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }
    return NextResponse.json(skill);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch skill" },
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
    const existing = await prisma.skill.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    const nextLogo = body.logo ?? "";
    const skill = await prisma.skill.update({
      where: { id },
      data: {
        name: body.name,
        category: body.category,
        logo: nextLogo,
      },
    });

    if (nextLogo !== existing.logo && shouldDeleteSkillLogo(existing.logo)) {
      const result = await deleteImage(existing.logo);
      if (result.error) {
        console.error("Failed to delete previous skill logo:", result.error);
      }
    }

    revalidatePath("/about");
    return NextResponse.json(skill);
  } catch {
    return NextResponse.json(
      { error: "Failed to update skill" },
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
    const existing = await prisma.skill.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    await prisma.skill.delete({ where: { id } });

    if (shouldDeleteSkillLogo(existing.logo)) {
      const result = await deleteImage(existing.logo);
      if (result.error) {
        console.error("Failed to delete skill logo:", result.error);
      }
    }

    revalidatePath("/about");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete skill" },
      { status: 500 },
    );
  }
}
