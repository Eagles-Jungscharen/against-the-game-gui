import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RunTaskElement } from 'src/app/models/run-game';

export enum TaskActionEventType {
  ASSIGN,
  COMPLETED,
}
export interface TaskActionEvent {
  task: RunTaskElement;
  event: TaskActionEventType;
}

@Component({
  selector: 'app-task-element',
  templateUrl: './task-element.component.html',
  styleUrls: ['./task-element.component.scss'],
})
export class TaskElementComponent implements OnInit {
  @Input() task!: RunTaskElement;
  @Output() onAction = new EventEmitter<TaskActionEvent>();
  constructor() {}

  ngOnInit(): void {}

  getTitle() {
    return this.task.taskElement.no + ' - ' + this.task.taskElement.name;
  }

  assignTask() {
    this.onAction.emit({ task: this.task, event: TaskActionEventType.ASSIGN });
  }
  completeTask() {
    this.onAction.emit({ task: this.task, event: TaskActionEventType.COMPLETED });
  }
  showAssign(): boolean {
    return this.task.status === 'running';
  }
  showCompleted(): boolean {
    return this.task.status === 'assigned';
  }
}
