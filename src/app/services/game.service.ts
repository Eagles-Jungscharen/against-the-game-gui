import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private httpClient: HttpClient) {}

  getGame(id: string): Observable<Game> {
    return this.httpClient.get<Game>(environment.apiURL + '/api/game/' + id);
  }
  saveGame(game: Game): Observable<Game> {
    const secId = localStorage.getItem('ID_' + game.id) + '';
    return this.httpClient.post<Game>(environment.apiURL + '/api/game/' + game.id, game, { headers: new HttpHeaders({ 'game-sec': secId }) });
  }
}
