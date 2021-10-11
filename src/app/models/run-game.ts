import { Game } from './game';
import { TaskElement } from './task-element';

export class RunGame {
  id!: string;
  game!: Game;
  status!: string;
  startAt!: Date;
  runnerClientId!: string;
  currentPointsPlayer!: number;
  currentPointsComputer!: number;
  tasks!: RunTaskElement[];
}
export class RunTaskElement {
  id!: string;
  taskElement!: TaskElement;
  status!: string;
  startTime!: Date;
}
