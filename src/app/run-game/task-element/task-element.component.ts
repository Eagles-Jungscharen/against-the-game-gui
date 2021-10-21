import { DataSource } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeoutError } from 'rxjs';
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
  @Input() runTimeMinutes: number = 5;
  @Output() onAction = new EventEmitter<TaskActionEvent>();
  currentTime = new Date();
  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      this.currentTime = new Date();
    }, 2000);
  }

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
  progressStatus(): number {
    const start = new Date(this.task.startTime);
    const timeDiff = (this.currentTime.getTime() - start.getTime()) / 1000;
    const maxTime = this.runTimeMinutes * 60;
    const remain = Math.max(maxTime - timeDiff, 0);
    return (remain * 100) / maxTime;
  }
}
