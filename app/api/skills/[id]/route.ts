import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const skill = await prisma.skill.findUnique({ where: { id } })
    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 })
    }
    return NextResponse.json(skill)
  } catch {
    return NextResponse.json({ error: "Failed to fetch skill" }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const skill = await prisma.skill.update({
      where: { id },
      data: {
        name: body.name,
        category: body.category,
        logo: body.logo ?? "",
      },
    })
    return NextResponse.json(skill)
  } catch {
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.skill.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 })
  }
}
