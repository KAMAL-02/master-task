import { Task, TasksState } from '../../types/kanban/kanbanTask'
export const STORAGE_KEY = 'kanban-tasks'

export const loadTasksFromStorage = (): TasksState | null => {
  if (typeof window === 'undefined') return null
  
  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) return null

  try {
    const parsed = JSON.parse(saved)
    // Convert ISO date strings back to Date objects
    Object.keys(parsed).forEach(column => {
      parsed[column] = parsed[column].map((task: Task) => ({
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate) : null
      }))
    })
    return parsed
  } catch (e) {
    console.error('Error loading tasks from storage:', e)
    return null
  }
}

export const saveTasksToStorage = (tasks: TasksState) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}