import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(skills);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;
  try {
    const body = await request.json();
    const skill = await prisma.skill.create({
      data: {
        name: body.name,
        category: body.category,
        logo: body.logo ?? "",
      },
    });
    return NextResponse.json(skill, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 },
    );
  }
}
