"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

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
import { Textarea } from "@/components/ui/textarea"

const experienceSchema = z.object({
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  description: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

export type ExperienceItem = z.infer<typeof experienceSchema>

export function ExperienceModal({
  open,
  onOpenChange,
  initialValue,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialValue?: ExperienceItem | null
  onSave: (item: ExperienceItem) => void
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExperienceItem>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: "",
      position: "",
      description: "",
      startDate: "",
      endDate: "",
    },
  })

  useEffect(() => {
    if (open) {
      reset({
        company: initialValue?.company ?? "",
        position: initialValue?.position ?? "",
        description: initialValue?.description ?? "",
        startDate: initialValue?.startDate ?? "",
        endDate: initialValue?.endDate ?? "",
      })
    }
  }, [open, reset, initialValue])

  const submit = (data: ExperienceItem) => {
    onSave(data)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{initialValue ? "Edit Experience" : "Add Experience"}</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="company">Company *</Label>
            <Input id="company" placeholder="Company name" {...register("company")} />
            {errors.company && (
              <p className="text-sm text-destructive">{errors.company.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="position">Position *</Label>
            <Input id="position" placeholder="Job title" {...register("position")} />
            {errors.position && (
              <p className="text-sm text-destructive">{errors.position.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Brief description..." rows={3} {...register("description")} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" placeholder="Jan 2020" {...register("startDate")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" placeholder="Present" {...register("endDate")} />
            </div>
          </div>

          <DialogFooter showCloseButton>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
