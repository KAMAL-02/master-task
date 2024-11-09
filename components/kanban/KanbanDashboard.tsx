'use client'

import { useState } from 'react'
import KanbanColumn from './KanbanColumn'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'

interface Task {
  id: string
  title: string
  description: string
  dueDate: Date | null
}

interface TasksState {
  'To Do': Task[]
  'In Progress': Task[]
  'Completed': Task[]
}

const KanbanDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<TasksState>({
    'To Do': [],
    'In Progress': [],
    'Completed': []
  })

  // Handle the drag end event and move tasks across columns
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    // If dropped outside or in the same place, do nothing
    if (!destination || (source.index === destination.index && source.droppableId === destination.droppableId)) {
      return
    }

    // Restrict source.droppableId and destination.droppableId to be keys of TasksState
    const sourceColumn = source.droppableId as keyof TasksState
    const destinationColumn = destination.droppableId as keyof TasksState

    // Reorder tasks in the same column
    if (sourceColumn === destinationColumn) {
      const columnTasks = tasks[sourceColumn]
      const reorderedTasks = Array.from(columnTasks)
      const [removed] = reorderedTasks.splice(source.index, 1)
      reorderedTasks.splice(destination.index, 0, removed)
      setTasks((prevTasks) => ({
        ...prevTasks,
        [sourceColumn]: reorderedTasks
      }))
    } else {
      // Move task to a different column
      const sourceColumnTasks = tasks[sourceColumn]
      const [removed] = sourceColumnTasks.splice(source.index, 1)

      const destinationColumnTasks = tasks[destinationColumn]
      destinationColumnTasks.splice(destination.index, 0, removed)

      setTasks({
        ...tasks,
        [sourceColumn]: sourceColumnTasks,
        [destinationColumn]: destinationColumnTasks
      })
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 p-8">
        <KanbanColumn
          title="To Do"
          tasks={tasks['To Do']}
          setTasks={(newTasks) => setTasks((prev) => ({ ...prev, 'To Do': newTasks }))}
        />
        <KanbanColumn
          title="In Progress"
          tasks={tasks['In Progress']}
          setTasks={(newTasks) => setTasks((prev) => ({ ...prev, 'In Progress': newTasks }))}
        />
        <KanbanColumn
          title="Completed"
          tasks={tasks['Completed']}
          setTasks={(newTasks) => setTasks((prev) => ({ ...prev, 'Completed': newTasks }))}
        />
      </div>
    </DragDropContext>
  )
}

export default KanbanDashboard
