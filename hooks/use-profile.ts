import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { Profile } from "@/generated/prisma/client"

type Socials = {
  github?: string
  linkedin?: string
  twitter?: string
  instagram?: string
}

type EducationItem = {
  institution: string
  degree?: string
  fieldOfStudy?: string
  startYear?: string
  endYear?: string
}

type ExperienceItem = {
  company: string
  position: string
  description?: string
  startDate?: string
  endDate?: string
}

export type ProfilePayload = {
  name: string
  role: string
  email?: string | null
  location?: string | null
  bio: string
  avatar?: string
  socials: Socials
  education: EducationItem[]
  experience: ExperienceItem[]
}

export function useProfile() {
  return useQuery<Profile | null>({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch("/api/profile")
      if (!res.ok) throw new Error("Failed to fetch profile")
      return res.json()
    },
  })
}

export function useSaveProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: ProfilePayload) => {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed to save profile")
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] })
    },
  })
}
