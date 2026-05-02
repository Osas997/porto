import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteImage } from "@/lib/upload";
import { NextRequest, NextResponse } from "next/server";

const DEFAULT_PROFILE_AVATAR = "/images/avatar.jpg";

function shouldDeleteProfileAvatar(url: string | null | undefined) {
  return (
    !!url &&
    url !== DEFAULT_PROFILE_AVATAR &&
    url.includes("/storage/v1/object/public/")
  );
}

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

export async function GET(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;
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
  const authError = await requireAuth(request);
  if (authError) return authError;
  try {
    const body = await request.json();

    const socials: Socials = body.socials ?? {};
    const education: EducationItem[] = body.education ?? [];
    const experience: ExperienceItem[] = body.experience ?? [];

    const existing = await prisma.profile.findFirst();
    const nextAvatar = body.avatar ?? "";

    const data = {
      name: body.name,
      role: body.role,
      bio: body.bio,
      avatar: nextAvatar,
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

      if (
        nextAvatar !== (existing.avatar ?? "") &&
        shouldDeleteProfileAvatar(existing.avatar)
      ) {
        const result = await deleteImage(existing.avatar!);
        if (result.error) {
          console.error(
            "Failed to delete previous profile avatar:",
            result.error,
          );
        }
      }

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

export async function DELETE(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;
  try {
    const existing = await prisma.profile.findFirst();

    if (!existing) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    await prisma.profile.delete({ where: { id: existing.id } });

    if (shouldDeleteProfileAvatar(existing.avatar)) {
      const result = await deleteImage(existing.avatar!);
      if (result.error) {
        console.error("Failed to delete profile avatar:", result.error);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete profile" },
      { status: 500 },
    );
  }
}
