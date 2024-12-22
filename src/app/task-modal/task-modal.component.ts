import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../models/task.model.ts';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent {
  task: Task;

  constructor(
    public dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
    this.task = data ? { ...data } : { id: 0, title: '', priority: 'Low', status: 'Pending' };
  }

  save(): void {
    if (this.task.title) {
      this.dialogRef.close(this.task);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
