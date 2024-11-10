'use client'

import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import "react-datepicker/dist/react-datepicker.css"

export interface FormData {
  title: string
  description: string
  dueDate: Date | null
}

interface KanbanTaskProps {
  onSubmit: (data: FormData) => void
  initialData?: FormData
  onCancel?: () => void
}

export default function KanbanTask({ onSubmit, initialData, onCancel }: KanbanTaskProps) {
  const [open, setOpen] = useState(false)
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: initialData || {
      title: '',
      description: '',
      dueDate: new Date()
    }
  })

  useEffect(() => {
    if (initialData) {
      reset(initialData)
    }
  }, [initialData, reset])

  const onSubmitForm = (data: FormData) => {
    onSubmit(data)
    if (!initialData) {
      setOpen(false)
      reset()
    }
  }

  const content = (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div className="flex items-center space-x-4">
        <Label htmlFor="title" className="w-24">Title</Label>
        <Input 
          id="title" 
          {...register('title', { required: true })} 
          aria-invalid={errors.title ? "true" : "false"}
          className="flex-1"
        />
      </div>
      {errors.title && <p className="text-sm text-red-500">Title is required</p>}
      
      <div className="flex items-center space-x-4">
        <Label htmlFor="description" className="w-24">Description</Label>
        <Textarea 
          id="description" 
          {...register('description', { required: true })}
          aria-invalid={errors.description ? "true" : "false"}
          className="flex-1"
        />
      </div>
      {errors.description && <p className="text-sm text-red-500">Description is required</p>}

      <div className="flex items-center space-x-4">
        <Label htmlFor="dueDate" className="w-24">Due Date</Label>
        <Controller
          name="dueDate"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker
              id="dueDate"
              selected={field.value}
              onChange={(date: Date | null) => field.onChange(date)}
              className="w-full p-2 border rounded"
              minDate={new Date()}
              aria-invalid={errors.dueDate ? "true" : "false"}
            />
          )}
        />
      </div>
      {errors.dueDate && <p className="text-sm text-red-500">Due date is required</p>}

      <div className="flex justify-end space-x-2">
        {initialData && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">{initialData ? 'Update' : 'Add'} Task</Button>
      </div>
    </form>
  )

  if (initialData) {
    return content
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-white text-black">+ Add New Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  )
}
