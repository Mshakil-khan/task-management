import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { Task } from '../models/task.model.ts';
import { TaskService } from '../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filterStatus: string = '';

  constructor(private dialog: MatDialog, private taskService: TaskService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  openAddTaskModal(): void {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.addTask(result);
        this.loadTasks();
        this.showToast('Task added successfully!', 'success');
      }
    });
  }

  openEditTaskModal(task: Task): void {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '400px',
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.updateTask(result);
        this.loadTasks();
        this.showToast('Task updated successfully!', 'success');
      }
    });
  }

  deleteTask(taskId: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId);
      this.loadTasks();
      this.showToast('Task deleted successfully!', 'success');
    }
  }

  filterTasks(): Task[] {
    if (this.filterStatus) {
      return this.tasks.filter((task) => task.status === this.filterStatus);
    }
    return this.tasks;
  }

  private showToast(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
    });
  }
}
