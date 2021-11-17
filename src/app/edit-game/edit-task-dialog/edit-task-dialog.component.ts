import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskElement } from 'src/app/models/task-element';

export enum TaskEditEventType {
  CANCEL,
  CREATE,
}
export interface TaskEditEvent {
  eventType: TaskEditEventType;
  task: TaskElement;
}

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss'],
})
export class EditTaskDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<Component>, @Inject(MAT_DIALOG_DATA) public task: TaskElement) {}
  fgTask = new FormGroup({
    no: new FormControl(10, [Validators.required, Validators.min(1)]),
    name: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.fgTask.get('no')?.setValue(this.task.no);
    this.fgTask.get('name')?.setValue(this.task.name);
  }

  getTaskOperationName(): string {
    return this.task && this.task.id == '@new' ? 'Erstellen' : 'Speichern';
  }
  create(): void {
    this.task.no = this.fgTask.get('no')?.value;
    this.task.name = this.fgTask.get('name')?.value;
    this.dialogRef.close({ eventType: TaskEditEventType.CREATE, task: this.task });
  }
  cancel(): void {
    this.dialogRef.close({ eventType: TaskEditEventType.CANCEL });
  }
}
