import { useState, useEffect, useCallback } from 'react'
import { TasksState, Task } from '../types/kanban/kanbanTask'

const STORAGE_KEY = 'kanban-tasks'

const initialState: TasksState = {
  'To Do': [],
  'In Progress': [],
  'Completed': []
}

export const useKanbanTasks = () => {
  const [tasks, setTasks] = useState<TasksState>(initialState)
  const [isLoading, setIsLoading] = useState(true)

  const loadTasks = useCallback(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY)
      if (savedTasks) {
        const parsed = JSON.parse(savedTasks)
        Object.keys(parsed).forEach(column => {
          parsed[column] = parsed[column].map((task: Task) => ({
            ...task,
            dueDate: task.dueDate ? new Date(task.dueDate) : null
          }))
        })
        setTasks(parsed)
      }
    } catch (error) {
      console.error('Error loading tasks:', error)
      setTasks(initialState)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const saveTasks = useCallback((tasksToSave: TasksState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksToSave))
    } catch (error) {
      console.error('Error saving tasks:', error)
    }
  }, [])

  useEffect(() => {
    loadTasks()

    window.addEventListener('focus', loadTasks)
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        loadTasks()
      }
    }
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('focus', loadTasks)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [loadTasks])

  useEffect(() => {
    if (!isLoading) {
      saveTasks(tasks)
    }
  }, [tasks, isLoading, saveTasks])

  const updateTasks = useCallback((newTasks: TasksState | ((prev: TasksState) => TasksState)) => {
    setTasks(prev => {
      const updatedTasks = typeof newTasks === 'function' ? newTasks(prev) : newTasks

      const validatedTasks = Object.keys(updatedTasks).reduce((acc, column) => {
        acc[column as keyof TasksState] = updatedTasks[column as keyof TasksState]
          .filter(task => task && task.id)
          .map(task => ({
            ...task,
            dueDate: task.dueDate ? new Date(task.dueDate) : null
          }))
        return acc
      }, {} as TasksState)
      
      return validatedTasks
    })
  }, [])

  return {
    tasks,
    setTasks: updateTasks,
    isLoading
  }
}