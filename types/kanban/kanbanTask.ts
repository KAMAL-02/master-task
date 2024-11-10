export interface Task {
    id: string
    title: string
    description: string
    dueDate: Date | null
  }
  
  export interface TasksState {
    'To Do': Task[]
    'In Progress': Task[]
    'Completed': Task[]
}

export interface FormData {
  title: string
  description: string
  dueDate: Date | null
}