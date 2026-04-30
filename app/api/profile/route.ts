import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Socials = {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
};

type EducationItem = {
  institution: string;
  degree?: string;
  fieldOfStudy?: string;
  startYear?: string;
  endYear?: string;
};

type ExperienceItem = {
  company: string;
  position: string;
  description?: string;
  startDate?: string;
  endDate?: string;
};

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst();
    return NextResponse.json(profile);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const socials: Socials = body.socials ?? {};
    const education: EducationItem[] = body.education ?? [];
    const experience: ExperienceItem[] = body.experience ?? [];

    const existing = await prisma.profile.findFirst();

    const data = {
      name: body.name,
      role: body.role,
      bio: body.bio,
      avatar: body.avatar ?? "",
      location: body.location ?? null,
      email: body.email ?? null,
      socials: JSON.stringify(socials),
      education: JSON.stringify(education),
      experience: JSON.stringify(experience),
    };

    if (existing) {
      const updated = await prisma.profile.update({
        where: { id: existing.id },
        data,
      });
      return NextResponse.json(updated);
    }

    const created = await prisma.profile.create({ data });
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to save profile" },
      { status: 500 },
    );
  }
}
