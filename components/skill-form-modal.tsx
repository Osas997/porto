"use client"

import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ImagePlusIcon, LoaderIcon, XIcon } from "lucide-react"
import { toast } from "sonner"
import type { Skill } from "@/generated/prisma/client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateSkill, useUpdateSkill } from "@/hooks/use-skills"
import { uploadImage, deleteImage } from "@/lib/upload"

const skillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  logo: z.string(),
})

type SkillFormValues = z.infer<typeof skillSchema>

interface SkillFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  skill?: Skill | null
}

export function SkillFormModal({ open, onOpenChange, skill }: SkillFormModalProps) {
  const isEdit = !!skill
  const createSkill = useCreateSkill()
  const updateSkill = useUpdateSkill()
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(skill?.logo || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: skill?.name ?? "",
      category: skill?.category ?? "",
      logo: skill?.logo ?? "",
    },
  })

  useEffect(() => {
    if (open) {
      reset({
        name: skill?.name ?? "",
        category: skill?.category ?? "",
        logo: skill?.logo ?? "",
      })
      setPreview(skill?.logo || null)
    }
  }, [open, skill, reset])

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const result = await uploadImage(formData)
      if (result.error) throw new Error(result.error)

      setValue("logo", result.url!)
      setPreview(result.url!)
      toast.success("Logo uploaded")
    } catch {
      toast.error("Failed to upload logo")
    } finally {
      setUploading(false)
    }
  }

  const onSubmit = async (data: SkillFormValues) => {
    try {
      if (isEdit && skill && skill.logo && skill.logo !== data.logo) {
        await deleteImage(skill.logo)
      }

      if (isEdit && skill) {
        await updateSkill.mutateAsync({ id: skill.id, ...data })
        toast.success("Skill updated")
      } else {
        await createSkill.mutateAsync(data)
        toast.success("Skill created")
      }

      reset()
      setPreview(null)
      onOpenChange(false)
    } catch {
      toast.error(isEdit ? "Failed to update skill" : "Failed to create skill")
    }
  }

  const isPending = createSkill.isPending || updateSkill.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Skill" : "Add Skill"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the skill details below."
              : "Fill in the details to create a new skill."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Skill name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="Frontend, Backend, Tools"
              {...register("category")}
            />
            {errors.category && (
              <p className="text-sm text-destructive">{errors.category.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Logo</Label>
            <div className="flex items-center gap-4">
              {preview ? (
                <div className="relative h-12 w-12 overflow-hidden rounded-md border bg-muted">
                  <img
                    src={preview}
                    alt="Logo preview"
                    className="h-full w-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setValue("logo", "")
                      setPreview(null)
                    }}
                    className="absolute top-0.5 right-0.5 rounded-full bg-black/50 p-0.5 text-white"
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                </div>
              ) : null}

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
                {uploading ? "Uploading..." : "Upload Logo"}
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
              />
            </div>
          </div>

          <DialogFooter showCloseButton>
            <Button type="submit" disabled={isPending}>
              {isPending && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
