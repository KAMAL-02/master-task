'use client'

import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import KanbanColumn from './KanbanColumn'
import { useKanbanTasks } from '../../hooks/useKanbanTask'
import { TasksState } from '../../types/kanban/kanbanTask'

const KanbanDashboard: React.FC = () => {
  const { tasks, setTasks, isLoading } = useKanbanTasks()

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) return

    setTasks(prev => {
      const newTasks = { ...prev }
      const sourceId = source.droppableId as keyof TasksState
      const destId = destination.droppableId as keyof TasksState

      const sourceColumn = [...newTasks[sourceId]]
      const destColumn = sourceId === destId ? sourceColumn : [...newTasks[destId]]

      const [removed] = sourceColumn.splice(source.index, 1)
      destColumn.splice(destination.index, 0, removed)

      return {
        ...newTasks,
        [sourceId]: sourceColumn,
        [destId]: destColumn
      }
    })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 p-8">
        {Object.entries(tasks).map(([columnId, columnTasks]) => (
          <KanbanColumn
            key={columnId}
            title={columnId}
            tasks={columnTasks}
            setTasks={(newTasks) => 
              setTasks(prev => ({
                ...prev,
                [columnId]: newTasks
              }))
            }
          />
        ))}
      </div>
    </DragDropContext>
  )
}

export default KanbanDashboard