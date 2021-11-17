import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { RunGame, RunTaskElement } from '../models/run-game';
import { GameService } from '../services/game.service';
import { TaskActionEvent, TaskActionEventType } from './task-element/task-element.component';

@Component({
  selector: 'app-run-game',
  templateUrl: './run-game.component.html',
  styleUrls: ['./run-game.component.scss'],
})
export class RunGameComponent implements OnInit, OnDestroy {
  timer!: Subscription;
  runGame!: RunGame;
  openTasks: RunTaskElement[] = [];
  atworkTasks: RunTaskElement[] = [];
  constructor(private gameService: GameService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id) {
        this.gameService.statusRunGame(id).subscribe((result) => {
          this.buildModel(result);
        });
        this.timer = interval(10000).subscribe((n) =>
          this.gameService.statusRunGame(id).subscribe((result) => {
            this.buildModel(result);
          })
        );
      }
    });
  }
  ngOnDestroy() {
    this.timer.unsubscribe();
  }
  startGame() {
    this.gameService.startRunGame(this.runGame.id).subscribe((result) => this.buildModel(result));
  }
  resetGame() {
    if (confirm('Soll das Spiel beendet und zurückgesetzt werden? Achtung alle TASK sind nicht mehr gelöst!')) {
      this.gameService.resetRunGame(this.runGame.id).subscribe((result) => this.buildModel(result));
    }
  }
  endGame() {
    if (confirm('Achtung das Stoppen des Spiels, beendet es. Ein Forsetzen ist danach nicht mehr möglich')) {
      this.gameService.endRunGame(this.runGame.id).subscribe((result) => this.buildModel(result));
    }
  }
  pauseGame() {
    this.gameService.pauseRunGame(this.runGame.id).subscribe((result) => this.buildModel(result));
  }

  buildModel(runGame: RunGame): void {
    this.runGame = runGame;
    this.runGame.tasks = this.runGame.tasks || [];
    this.openTasks = runGame.tasks.filter((task) => task.status === 'running');
    this.atworkTasks = runGame.tasks.filter((task) => task.status === 'assigned');
  }
  disableStartButton() {
    return this.runGame.status === 'running';
  }
  disableStopButton() {
    return this.runGame.status !== 'running' && this.runGame.status !== 'lost' && this.runGame.status !== 'won';
  }
  disableResetButton() {
    return this.runGame.status === 'notstarted';
  }
  processAction($event: TaskActionEvent) {
    switch ($event.event) {
      case TaskActionEventType.ASSIGN:
        this.gameService.assignTask(this.runGame.id, $event.task.id).subscribe((game) => this.buildModel(game));
        break;
      case TaskActionEventType.COMPLETED:
        this.gameService.completeTask(this.runGame.id, $event.task.id).subscribe((game) => this.buildModel(game));
        break;
    }
  }
  isLostOrWon() {
    return this.runGame.status == 'won' || this.runGame.status == 'lost';
  }
  theWinnerIs() {
    if (this.runGame.status == 'won') {
      return this.runGame.game.playerTeamName + ' hat gewonnen!!';
    }
    if (this.runGame.status == 'lost') {
      return this.runGame.game.computerTeamName + ' hat gewonnen!!';
    }
    return 'Noch hat niemand gewonnen';
  }
}
