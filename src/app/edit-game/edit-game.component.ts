import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Game } from '../models/game';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.scss'],
})
export class EditGameComponent implements OnInit {
  game!: Game;
  loaded = false;
  fgGame = new FormGroup({
    nameControl: new FormControl('', Validators.required),
    playerTeamNameControl: new FormControl('', Validators.required),
    computerTeamNameControl: new FormControl(),
    taskPointsControl: new FormControl(),
    playerTeamPointsControl: new FormControl(),
    computerTeamPointsControl: new FormControl(),
  });

  constructor(private activatedRoute: ActivatedRoute, private gameService: GameService, private router: Router) {}

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
    this.gameService.saveGame(this.game).subscribe((game) => {
      this.game = game;
      this.loaded = true;
      this.applyModel;
    });
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
      },
      { emitEvent: false }
    );
  }
}
