import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Completed';
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private localStorageKey = 'tasks';

  constructor() {
    // Initialize tasks if not already present
    if (!localStorage.getItem(this.localStorageKey)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    }
  }

  getTasks(): Task[] {
    const tasks = localStorage.getItem(this.localStorageKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  addTask(newTask: Task): void {
    const tasks = this.getTasks();
    newTask.id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1; // Generate unique ID
    tasks.push(newTask);
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }

  updateTask(updatedTask: Task): void {
    const tasks = this.getTasks();
    const index = tasks.findIndex((task) => task.id === updatedTask.id);
    if (index > -1) {
      tasks[index] = updatedTask;
      localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
    }
  }

  deleteTask(taskId: number): void {
    let tasks = this.getTasks();
    tasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }
}
