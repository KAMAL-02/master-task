"use client"
import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import KanbanTask from './KanbanTask'
import { FormData, Task } from '@/types/kanban/kanbanTask'
import { Button } from "@/components/ui/button"
import { Droppable, Draggable } from '@hello-pangea/dnd'

interface KanbanColumnProps {
  title: string
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, tasks, setTasks }) => {
  const [editingTask, setEditingTask] = useState<string | null>(null)
  
  const safeTasks = Array.isArray(tasks) ? tasks.filter(task => task && task.id) : []

  const handleAddTask = (data: FormData) => {
    const newTask: Task = { 
      ...data, 
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` 
    }
    setTasks([...safeTasks, newTask])
  }

  const handleEditTask = (id: string, data: FormData) => {
    setTasks(
      safeTasks.map(task => 
        task.id === id 
          ? { ...task, ...data, id: task.id } 
          : task
      )
    )
    setEditingTask(null)
  }

  const handleDeleteTask = (id: string) => {
    setTasks(safeTasks.filter(task => task.id !== id))
  }

  return (
    <div className="flex flex-col w-full p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>

      <Droppable droppableId={title}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex-1 min-h-[100px] mb-2"
          >
            {safeTasks.map((task, index) => {
              if (!task || !task.id) return null

              return (
                <Draggable 
                  key={task.id} 
                  draggableId={task.id} 
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`p-2 mb-1 bg-white dark:bg-gray-700 rounded-md shadow ${
                        snapshot.isDragging ? 'opacity-50' : ''
                      }`}
                    >
                      {editingTask === task.id ? (
                        <KanbanTask 
                          onSubmit={(data) => handleEditTask(task.id, data)} 
                          initialData={task}
                          onCancel={() => setEditingTask(null)}
                        />
                      ) : (
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold break-words">{task.title}</h3>
                            <div className="flex h-4 flex-shrink-0 ml-2">
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => setEditingTask(task.id)}
                                aria-label={`Edit task: ${task.title}`}
                              >
                                <Pencil className="h-4 w-4 text-blue-500" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleDeleteTask(task.id)}
                                aria-label={`Delete task: ${task.title}`}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-200 whitespace-pre-wrap break-words">{task.description}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-300">
                            Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <KanbanTask onSubmit={handleAddTask} />
    </div>
  )
}

export default KanbanColumn