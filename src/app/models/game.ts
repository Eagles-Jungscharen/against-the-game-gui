import { TaskElement } from './task-element';

export class Game {
  id!: string;
  name!: string;
  number!: string;
  playerTeamName!: string;
  computerTeamName!: string;
  taskPoints!: number;
  playerTeamPoints!: number;
  computerTeamPoints!: number;
  interval!: number;
  taskDuration!: number;
  tasks!: TaskElement[];
}
