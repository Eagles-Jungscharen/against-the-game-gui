import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';
import { RunGame } from '../models/run-game';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-run-game',
  templateUrl: './run-game.component.html',
  styleUrls: ['./run-game.component.scss'],
})
export class RunGameComponent implements OnInit, OnDestroy {
  timer!: Subscription;
  runGame!: RunGame;
  constructor(private gameService: GameService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id) {
        this.gameService.statusRunGame(id).subscribe((result) => {
          this.runGame = result;
        });
        this.timer = interval(10000).subscribe((n) =>
          this.gameService.statusRunGame(id).subscribe((result) => {
            this.runGame = result;
          })
        );
      }
    });
  }
  ngOnDestroy() {
    this.timer.unsubscribe();
  }
  startGame() {
    this.gameService.startRunGame(this.runGame.id).subscribe((result) => (this.runGame = result));
  }
}
