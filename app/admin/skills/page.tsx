"use client"

import { useState } from "react"
import { toast } from "sonner"
import type { Skill } from "@/generated/prisma/client"
import { PlusIcon, MoreHorizontalIcon, PencilIcon, TrashIcon, LoaderIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { useDeleteSkill, useSkills } from "@/hooks/use-skills"
import { SkillFormModal } from "@/components/skill-form-modal"
import { deleteImage } from "@/lib/upload"

export default function SkillsPage() {
  const { data: skills, isLoading } = useSkills()
  const deleteSkill = useDeleteSkill()

  const [formOpen, setFormOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill)
    setFormOpen(true)
  }

  const handleAdd = () => {
    setEditingSkill(null)
    setFormOpen(true)
  }

  const handleDelete = async () => {
    if (!deleteId || !skills) return
    try {
      const skillToDelete = skills.find((s) => s.id === deleteId)
      if (skillToDelete?.logo) {
        await deleteImage(skillToDelete.logo)
      }

      await deleteSkill.mutateAsync(deleteId)
      toast.success("Skill deleted")
    } catch {
      toast.error("Failed to delete skill")
    } finally {
      setDeleteId(null)
    }
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Skills</h2>
          <p className="text-sm text-muted-foreground">Manage your portfolio skills</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={handleAdd}>
            <PlusIcon className="mr-2 h-4 w-4" /> Add Skill
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <LoaderIcon className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : !skills?.length ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[72px]">Logo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Date Created</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No skills found.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[72px]">Logo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Date Created</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skills.map((skill) => (
                <TableRow key={skill.id}>
                  <TableCell>
                    {skill.logo ? (
                      <div className="h-10 w-10 overflow-hidden rounded-md border bg-muted">
                        <img
                          src={skill.logo}
                          alt={skill.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-md border bg-muted" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{skill.name}</TableCell>
                  <TableCell>{skill.category}</TableCell>
                  <TableCell className="text-right">
                    {new Date(skill.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEdit(skill)}>
                            <PencilIcon className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => setDeleteId(skill.id)}
                          >
                            <TrashIcon className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <SkillFormModal open={formOpen} onOpenChange={setFormOpen} skill={editingSkill} />

      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Skill</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this skill? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteSkill.isPending}
            >
              {deleteSkill.isPending && (
                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
