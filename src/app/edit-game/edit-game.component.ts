import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Game } from '../models/game';
import { TaskElement } from '../models/task-element';
import { GameService } from '../services/game.service';
import { TaskEditEventType, TaskEditEvent, EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import { MassTaskDialogComponent, MassTaskEvent, MassTaskEventType } from './mass-task-dialog/mass-task-dialog.component';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.scss'],
})
export class EditGameComponent implements OnInit {
  game!: Game;
  loaded = false;
  displayedColumns = ['no', 'name', 'action'];
  dataSource = new MatTableDataSource<TaskElement>();
  taskElements: TaskElement[] = [];
  fgGame = new FormGroup({
    nameControl: new FormControl('', Validators.required),
    playerTeamNameControl: new FormControl('', Validators.required),
    computerTeamNameControl: new FormControl(),
    taskPointsControl: new FormControl(),
    playerTeamPointsControl: new FormControl(),
    computerTeamPointsControl: new FormControl(),
    intervalControl: new FormControl('', [Validators.required, Validators.min(10)]),
  });

  constructor(private activatedRoute: ActivatedRoute, private gameService: GameService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      const secCode = localStorage.getItem('ID_' + id);
      if (id && secCode) {
        this.gameService.getGame(id).subscribe((game) => {
          console.log(game);
          this.game = game;
          this.loaded = true;
          this.applyModel();
        });
        this.gameService.getTaskElements(id).subscribe((result) => {
          this.taskElements = result;
          this.dataSource.data = this.sortTE(result);
        });
      } else {
        this.router.navigateByUrl('login');
      }
    });
  }
  save() {
    this.game.name = this.fgGame.get('nameControl')?.value;
    this.game.computerTeamName = this.fgGame.get('computerTeamNameControl')?.value;
    this.game.computerTeamPoints = this.fgGame.get('computerTeamPointsControl')?.value;
    this.game.playerTeamName = this.fgGame.get('playerTeamNameControl')?.value;
    this.game.playerTeamPoints = this.fgGame.get('playerTeamPointsControl')?.value;
    this.game.taskPoints = this.fgGame.get('taskPointsControl')?.value;
    this.game.interval = this.fgGame.get('intervalControl')?.value;
    this.gameService.saveGame(this.game).subscribe((game) => {
      this.game = game;
      this.loaded = true;
      this.applyModel;
    });
  }
  editTask(task: TaskElement) {
    this.executeEdit(task);
  }
  createTask() {
    const task: TaskElement = new TaskElement();
    task.no = this.taskElements.length;
    task.id = '@new';
    this.executeEdit(task);
  }
  createMultiTask() {
    const ref = this.dialog.open(MassTaskDialogComponent, { width: '350px' });
    ref.afterClosed().subscribe((result: MassTaskEvent) => {
      if (result.eventType == MassTaskEventType.CREATE) {
        const start = this.taskElements.length;
        for (let count = 0; count < result.count; count++) {
          const taskNo = start + count + 1;
          const te = TaskElement.create(taskNo, result.prefix + ' ' + taskNo + ' ' + result.postfix);
          this.gameService.saveTaskElement(this.game.id, te).subscribe((result) => {
            this.taskElements.push(result);
            this.dataSource.data = this.sortTE(this.taskElements);
          });
        }
      }
    });
  }
  disabledSaveMeta(): boolean {
    return this.fgGame.invalid || !this.fgGame.dirty;
  }

  doJoinGame() {
    this.router.navigateByUrl('run/' + this.game.id);
  }

  private applyModel() {
    this.fgGame.setValue(
      {
        nameControl: this.game.name,
        playerTeamNameControl: this.game.playerTeamName,
        computerTeamNameControl: this.game.computerTeamName,
        taskPointsControl: this.game.taskPoints,
        playerTeamPointsControl: this.game.playerTeamPoints,
        computerTeamPointsControl: this.game.computerTeamPoints,
        intervalControl: this.game.interval,
      },
      { emitEvent: false, onlySelf: true }
    );
  }
  private sortTE(tasks: TaskElement[]): TaskElement[] {
    return tasks.sort((t1, t2) => (t1.no < t2.no ? -1 : 1));
  }
  private executeEdit(task: TaskElement) {
    this.dialog
      .open(EditTaskDialogComponent, { width: '350px', data: task })
      .afterClosed()
      .subscribe((result: TaskEditEvent) => {
        switch (result.eventType) {
          case TaskEditEventType.CREATE:
            const id = result.task.id;
            this.gameService.saveTaskElement(this.game.id, result.task).subscribe((res) => {
              if (id == '@new') {
                this.taskElements.push(res);
              }
              this.dataSource.data = this.sortTE(this.taskElements);
            });
        }
      });
  }
}
