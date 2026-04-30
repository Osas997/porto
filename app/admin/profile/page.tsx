"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import { PlusIcon, LoaderIcon, ImagePlusIcon, XIcon, PencilIcon, TrashIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import { useProfile, useSaveProfile, type ProfilePayload } from "@/hooks/use-profile"
import { uploadImage, deleteImage } from "@/lib/upload"
import { EducationModal, type EducationItem } from "@/components/education-modal"
import { ExperienceModal, type ExperienceItem } from "@/components/experience-modal"

function safeJsonParse<T>(value: unknown, fallback: T): T {
  if (typeof value !== "string" || !value) return fallback
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

export default function ProfilePage() {
  const { data: profile, isLoading } = useProfile()
  const saveProfile = useSaveProfile()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const [educationOpen, setEducationOpen] = useState(false)
  const [experienceOpen, setExperienceOpen] = useState(false)
  const [editingEducationIndex, setEditingEducationIndex] = useState<number | null>(null)
  const [editingExperienceIndex, setEditingExperienceIndex] = useState<number | null>(null)

  const [avatar, setAvatar] = useState<string>("")
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [email, setEmail] = useState("")
  const [location, setLocation] = useState("")
  const [bio, setBio] = useState("")

  const [github, setGithub] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [twitter, setTwitter] = useState("")
  const [instagram, setInstagram] = useState("")

  const [education, setEducation] = useState<EducationItem[]>([])
  const [experience, setExperience] = useState<ExperienceItem[]>([])

  const initialAvatar = useMemo(() => profile?.avatar ?? "", [profile?.avatar])

  useEffect(() => {
    if (!profile) return

    setAvatar(profile.avatar ?? "")
    setName(profile.name ?? "")
    setRole(profile.role ?? "")
    setEmail(profile.email ?? "")
    setLocation(profile.location ?? "")
    setBio(profile.bio ?? "")

    const socials = safeJsonParse<Record<string, string>>(profile.socials, {})
    setGithub(socials.github ?? "")
    setLinkedin(socials.linkedin ?? "")
    setTwitter(socials.twitter ?? "")
    setInstagram(socials.instagram ?? "")

    setEducation(safeJsonParse<EducationItem[]>(profile.education, []))
    setExperience(safeJsonParse<ExperienceItem[]>(profile.experience, []))
  }, [profile])

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const result = await uploadImage(formData)
      if (result.error) throw new Error(result.error)

      if (avatar && avatar !== initialAvatar) {
        await deleteImage(avatar)
      }

      setAvatar(result.url!)
      toast.success("Avatar uploaded")
    } catch {
      toast.error("Failed to upload avatar")
    } finally {
      setUploading(false)
    }
  }

  const removeAvatar = async () => {
    try {
      if (avatar && avatar !== initialAvatar) {
        await deleteImage(avatar)
      }
    } finally {
      setAvatar("")
    }
  }

  const onSave = async () => {
    const payload: ProfilePayload = {
      name,
      role,
      email: email || null,
      location: location || null,
      bio,
      avatar,
      socials: {
        github,
        linkedin,
        twitter,
        instagram,
      },
      education,
      experience,
    }

    try {
      await saveProfile.mutateAsync(payload)
      toast.success("Profile saved")
    } catch {
      toast.error("Failed to save profile")
    }
  }

  return (
    <div className="flex-1 space-y-6">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your personal information and biography.
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <LoaderIcon className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-6 md:grid-cols-[180px_1fr]">
                <div className="grid gap-3 justify-items-center">
                  <div className="relative size-28 overflow-hidden rounded-full border bg-muted">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="Avatar"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                        No Avatar
                      </div>
                    )}
                    {avatar ? (
                      <button
                        type="button"
                        onClick={removeAvatar}
                        className="absolute top-1 right-1 rounded-full bg-black/50 p-1 text-white"
                      >
                        <XIcon className="h-3 w-3" />
                      </button>
                    ) : null}
                  </div>

                  <div className="grid gap-2 justify-items-center text-center">
                    <p className="text-xs text-muted-foreground">Recommended size: 400×400px</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={uploading}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {uploading ? (
                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <ImagePlusIcon className="mr-2 h-4 w-4" />
                      )}
                      {uploading ? "Uploading..." : "Upload Avatar"}
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="role">Professional Role</Label>
                    <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Contact Email</Label>
                      <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bio">Biography</Label>
                    <Textarea
                      id="bio"
                      placeholder="Write a short summary about yourself..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div>
                    <Button onClick={onSave} disabled={saveProfile.isPending}>
                      {saveProfile.isPending && (
                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Save Profile
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    placeholder="https://github.com/username"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/username"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    placeholder="https://twitter.com/username"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    placeholder="https://instagram.com/username"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle>Education</CardTitle>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingEducationIndex(null)
                  setEducationOpen(true)
                }}
              >
                <PlusIcon className="mr-2 h-4 w-4" /> Add
              </Button>
            </CardHeader>
            <CardContent>
              {!education.length ? (
                <p className="text-sm text-muted-foreground">No education added yet.</p>
              ) : (
                <div className="space-y-3">
                  {education.map((item, idx) => (
                    <div key={idx} className="rounded-lg border p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="font-medium">{item.institution}</div>
                          <div className="text-sm text-muted-foreground">
                            {[item.degree, item.fieldOfStudy].filter(Boolean).join(" • ")}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {[item.startYear, item.endYear].filter(Boolean).join(" - ")}
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              setEditingEducationIndex(idx)
                              setEducationOpen(true)
                            }}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => {
                              setEducation((prev) => prev.filter((_, i) => i !== idx))
                            }}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle>Experience</CardTitle>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingExperienceIndex(null)
                  setExperienceOpen(true)
                }}
              >
                <PlusIcon className="mr-2 h-4 w-4" /> Add
              </Button>
            </CardHeader>
            <CardContent>
              {!experience.length ? (
                <p className="text-sm text-muted-foreground">No experience added yet.</p>
              ) : (
                <div className="space-y-3">
                  {experience.map((item, idx) => (
                    <div key={idx} className="rounded-lg border p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="font-medium">{item.company}</div>
                          <div className="text-sm text-muted-foreground">{item.position}</div>
                          {item.description ? (
                            <div className="text-sm mt-2">{item.description}</div>
                          ) : null}
                          <div className="text-xs text-muted-foreground mt-1">
                            {[item.startDate, item.endDate].filter(Boolean).join(" - ")}
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              setEditingExperienceIndex(idx)
                              setExperienceOpen(true)
                            }}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => {
                              setExperience((prev) => prev.filter((_, i) => i !== idx))
                            }}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <EducationModal
            open={educationOpen}
            onOpenChange={setEducationOpen}
            initialValue={
              editingEducationIndex === null
                ? null
                : education[editingEducationIndex] ?? null
            }
            onSave={(item) => {
              setEducation((prev) => {
                if (editingEducationIndex === null) return [...prev, item]
                return prev.map((e, idx) => (idx === editingEducationIndex ? item : e))
              })
              setEditingEducationIndex(null)
            }}
          />

          <ExperienceModal
            open={experienceOpen}
            onOpenChange={setExperienceOpen}
            initialValue={
              editingExperienceIndex === null
                ? null
                : experience[editingExperienceIndex] ?? null
            }
            onSave={(item) => {
              setExperience((prev) => {
                if (editingExperienceIndex === null) return [...prev, item]
                return prev.map((e, idx) => (idx === editingExperienceIndex ? item : e))
              })
              setEditingExperienceIndex(null)
            }}
          />
        </>
      )}
    </div>
  )
}
