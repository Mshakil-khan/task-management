// src/app/models/task.model.ts
export interface Task {
    id: number;
    title: string;
    description?: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'Pending' | 'In Progress' | 'Completed';
  }
  