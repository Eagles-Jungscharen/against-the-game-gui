import { TaskElement } from './task-element';

export class Game {
  name!: string;
  number!: string;
  playerTeamName!: string;
  computerTeamName!: string;
  startPoinst!: number;
  playerTeamPoints!: number;
  computerTeamPoints!: number;
  tasks!: TaskElement[];
}
