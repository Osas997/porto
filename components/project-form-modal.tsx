"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState, useRef, useEffect } from "react"
import { ImagePlusIcon, LoaderIcon, XIcon } from "lucide-react"
import { toast } from "sonner"
import type { Project } from "@/generated/prisma/client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useCreateProject, useUpdateProject } from "@/hooks/use-projects"
import { uploadImage, deleteImage } from "@/lib/upload"

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string(),
  techStack: z.string().min(1, "Tech stack is required"),
  githubUrl: z.string().url("Invalid URL").or(z.literal("")).optional(),
  demoUrl: z.string().url("Invalid URL").or(z.literal("")).optional(),
  featured: z.boolean(),
})

type ProjectFormValues = z.infer<typeof projectSchema>

interface ProjectFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project?: Project | null
}

export function ProjectFormModal({
  open,
  onOpenChange,
  project,
}: ProjectFormModalProps) {
  const isEdit = !!project
  const createProject = useCreateProject()
  const updateProject = useUpdateProject()
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(project?.image ?? null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title ?? "",
      description: project?.description ?? "",
      image: project?.image ?? "/placeholder.svg",
      techStack: project?.techStack ?? "",
      githubUrl: project?.githubUrl ?? "",
      demoUrl: project?.demoUrl ?? "",
      featured: project?.featured ?? false,
    },
  })

  useEffect(() => {
    if (open) {
      reset({
        title: project?.title ?? "",
        description: project?.description ?? "",
        image: project?.image ?? "/placeholder.svg",
        techStack: project?.techStack ?? "",
        githubUrl: project?.githubUrl ?? "",
        demoUrl: project?.demoUrl ?? "",
        featured: project?.featured ?? false,
      })
      setPreview(project?.image ?? null)
    }
  }, [open, project, reset])

  const featured = watch("featured")

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const result = await uploadImage(formData)

      if (result.error) throw new Error(result.error)

      setValue("image", result.url!)
      setPreview(result.url!)
      toast.success("Image uploaded")
    } catch {
      toast.error("Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      // Delete old image if changed during edit
      if (isEdit && project && project.image !== data.image && project.image !== "/placeholder.svg") {
        await deleteImage(project.image)
      }

      const payload = {
        ...data,
        githubUrl: data.githubUrl || null,
        demoUrl: data.demoUrl || null,
      }

      if (isEdit && project) {
        await updateProject.mutateAsync({ id: project.id, ...payload })
        toast.success("Project updated")
      } else {
        await createProject.mutateAsync(payload)
        toast.success("Project created")
      }

      reset()
      setPreview(null)
      onOpenChange(false)
    } catch {
      toast.error(isEdit ? "Failed to update project" : "Failed to create project")
    }
  }

  const isPending = createProject.isPending || updateProject.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Project" : "Add Project"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the project details below."
              : "Fill in the details to create a new project."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Project title"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Project description"
              rows={3}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Image</Label>
            <div className="flex items-center gap-4">
              {preview && preview !== "/placeholder.svg" ? (
                <div className="relative h-20 w-32 overflow-hidden rounded-md border">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setValue("image", "/placeholder.svg")
                      setPreview(null)
                    }}
                    className="absolute top-1 right-1 rounded-full bg-black/50 p-0.5 text-white"
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
                {uploading ? "Uploading..." : "Upload Image"}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="techStack">Tech Stack</Label>
            <Input
              id="techStack"
              placeholder="React, Next.js, TypeScript"
              {...register("techStack")}
            />
            {errors.techStack && (
              <p className="text-sm text-destructive">
                {errors.techStack.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input
              id="githubUrl"
              placeholder="https://github.com/..."
              {...register("githubUrl")}
            />
            {errors.githubUrl && (
              <p className="text-sm text-destructive">
                {errors.githubUrl.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="demoUrl">Demo URL</Label>
            <Input
              id="demoUrl"
              placeholder="https://..."
              {...register("demoUrl")}
            />
            {errors.demoUrl && (
              <p className="text-sm text-destructive">
                {errors.demoUrl.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <Label htmlFor="featured">Featured</Label>
            <Switch
              id="featured"
              checked={featured}
              onCheckedChange={(checked) => setValue("featured", checked)}
            />
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
