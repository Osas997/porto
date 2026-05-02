"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState, useRef, useEffect } from "react"
import { ImagePlusIcon, LoaderIcon, XIcon } from "lucide-react"
import { toast } from "sonner"
import type { ProjectInput } from "@/hooks/use-projects"

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
import { uploadImage } from "@/lib/upload"

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string(),
  images: z.array(z.string()),
  techStack: z.string().min(1, "Tech stack is required"),
  githubUrl: z.string().url("Invalid URL").or(z.literal("")).optional(),
  demoUrl: z.string().url("Invalid URL").or(z.literal("")).optional(),
  featured: z.boolean(),
})

type ProjectFormValues = z.infer<typeof projectSchema>

interface ProjectFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project?: ProjectInput | null
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
  const [showcaseImages, setShowcaseImages] = useState<string[]>(
    project?.images ?? []
  )
  const [uploadingShowcase, setUploadingShowcase] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const showcaseInputRef = useRef<HTMLInputElement>(null)

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
      images: project?.images ?? [],
      techStack: project?.techStack ?? "",
      githubUrl: project?.githubUrl ?? "",
      demoUrl: project?.demoUrl ?? "",
      featured: project?.featured ?? false,
    },
  })

  useEffect(() => {
    if (open) {
      const parsedImages = project?.images ?? []
      reset({
        title: project?.title ?? "",
        description: project?.description ?? "",
        image: project?.image ?? "/placeholder.svg",
        images: parsedImages,
        techStack: project?.techStack ?? "",
        githubUrl: project?.githubUrl ?? "",
        demoUrl: project?.demoUrl ?? "",
        featured: project?.featured ?? false,
      })
      setPreview(project?.image ?? null)
      setShowcaseImages(parsedImages)
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

  const handleShowcaseUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return

    setUploadingShowcase(true)
    try {
      const newUrls: string[] = []
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append("file", file)
        const result = await uploadImage(formData)
        if (result.error) throw new Error(result.error)
        if (result.url) newUrls.push(result.url)
      }
      const updated = [...showcaseImages, ...newUrls]
      setShowcaseImages(updated)
      setValue("images", updated)
      toast.success(`${newUrls.length} image(s) uploaded`)
    } catch {
      toast.error("Failed to upload showcase images")
    } finally {
      setUploadingShowcase(false)
    }
  }

  const removeShowcaseImage = (index: number) => {
    const updated = showcaseImages.filter((_, i) => i !== index)
    setShowcaseImages(updated)
    setValue("images", updated)
  }

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      const payload = {
        ...data,
        images: showcaseImages,
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
      setShowcaseImages([])
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
            <Label>Thumbnail Image</Label>
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
                {uploading ? "Uploading..." : "Upload Thumbnail"}
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
            <Label>Showcase Images</Label>
            <p className="text-xs text-muted-foreground">
              Add multiple images to create a project gallery. These will be displayed on the project detail page.
            </p>
            {showcaseImages.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-2">
                {showcaseImages.map((url, idx) => (
                  <div key={idx} className="relative h-20 w-32 overflow-hidden rounded-md border group">
                    <img
                      src={url}
                      alt={`Showcase ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeShowcaseImage(idx)}
                      className="absolute top-1 right-1 rounded-full bg-black/50 p-0.5 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <XIcon className="h-3 w-3" />
                    </button>
                    <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/50 text-white text-[10px] font-bold">
                      {idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploadingShowcase}
              onClick={() => showcaseInputRef.current?.click()}
              className="mt-2"
            >
              {uploadingShowcase ? (
                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ImagePlusIcon className="mr-2 h-4 w-4" />
              )}
              {uploadingShowcase ? "Uploading..." : "Add Showcase Images"}
            </Button>
            <input
              ref={showcaseInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleShowcaseUpload}
            />
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
