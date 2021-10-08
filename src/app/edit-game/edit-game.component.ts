import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Game } from '../models/game';
import { TaskElement } from '../models/task-element';
import { GameService } from '../services/game.service';
import { MassTaskDialogComponent } from './mass-task-dialog/mass-task-dialog.component';

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
  createTask() {}
  createMultiTask() {
    const ref = this.dialog.open(MassTaskDialogComponent, { width: '350px' });
    ref.afterClosed().subscribe((result) => {});
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
      { emitEvent: false }
    );
  }
}
