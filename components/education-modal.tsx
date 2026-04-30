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

const educationSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().optional(),
  fieldOfStudy: z.string().optional(),
  startYear: z.string().optional(),
  endYear: z.string().optional(),
})

export type EducationItem = z.infer<typeof educationSchema>

export function EducationModal({
  open,
  onOpenChange,
  initialValue,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialValue?: EducationItem | null
  onSave: (item: EducationItem) => void
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EducationItem>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startYear: "",
      endYear: "",
    },
  })

  useEffect(() => {
    if (open) {
      reset({
        institution: initialValue?.institution ?? "",
        degree: initialValue?.degree ?? "",
        fieldOfStudy: initialValue?.fieldOfStudy ?? "",
        startYear: initialValue?.startYear ?? "",
        endYear: initialValue?.endYear ?? "",
      })
    }
  }, [open, reset, initialValue])

  const submit = (data: EducationItem) => {
    onSave(data)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{initialValue ? "Edit Education" : "Add Education"}</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="institution">Institution *</Label>
            <Input
              id="institution"
              placeholder="University name"
              {...register("institution")}
            />
            {errors.institution && (
              <p className="text-sm text-destructive">{errors.institution.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="degree">Degree</Label>
            <Input
              id="degree"
              placeholder="Bachelor's, Master's, etc."
              {...register("degree")}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="fieldOfStudy">Field of Study</Label>
            <Input
              id="fieldOfStudy"
              placeholder="Computer Science"
              {...register("fieldOfStudy")}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="startYear">Start Year</Label>
              <Input id="startYear" placeholder="2018" {...register("startYear")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endYear">End Year</Label>
              <Input id="endYear" placeholder="2022" {...register("endYear")} />
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
