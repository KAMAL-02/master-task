import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import KanbanTask, { FormData } from './KanbanTask'
import { Button } from "@/components/ui/button"
import { Droppable, Draggable } from '@hello-pangea/dnd'

interface Task {
  id: string
  title: string
  description: string
  dueDate: Date | null
}

interface KanbanColumnProps {
  title: string
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, tasks, setTasks }) => {
  const [editingTask, setEditingTask] = useState<string | null>(null)

  const handleAddTask = (data: FormData) => {
    const newTask: Task = { ...data, id: Date.now().toString() }
    setTasks([...tasks, newTask])
  }

  const handleEditTask = (id: string, data: FormData) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...data } : task))
    setEditingTask(null)
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div className="flex flex-col w-full p-4 bg-gray-200 rounded-lg shadow-md">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>

      <Droppable droppableId={title}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex-1 min-h-[100px] mb-2"
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="p-2 mb-1 bg-white rounded-md shadow"
                  >
                    {editingTask === task.id ? (
                      <KanbanTask 
                        onSubmit={(data) => handleEditTask(task.id, data)} 
                        initialData={task}
                        onCancel={() => setEditingTask(null)}
                      />
                    ) : (
                      <>
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold">{task.title}</h3>
                          <div className="flex h-4">
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
                        <p className="text-sm text-gray-600">{task.description}</p>
                        <p className="text-xs text-gray-500">
                          Due: {task.dueDate ? task.dueDate.toLocaleDateString() : 'No due date'}
                        </p>
                      </>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <KanbanTask onSubmit={handleAddTask} />
    </div>
  )
}

export default KanbanColumn