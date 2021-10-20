import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../models/game';
import { RunGame } from '../models/run-game';
import { TaskElement } from '../models/task-element';

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
  saveTaskElement(id: string, te: TaskElement): Observable<TaskElement> {
    const teClean: any = te;
    if (teClean.endTime == null) {
      delete teClean.endTime;
    }
    const secId = localStorage.getItem('ID_' + id) + '';
    return this.httpClient.post<TaskElement>(environment.apiURL + '/api/taskelements?gameId=' + id, teClean, { headers: new HttpHeaders({ 'game-sec': secId }) });
  }
  getTaskElements(id: string): Observable<TaskElement[]> {
    return this.httpClient.get<TaskElement[]>(environment.apiURL + '/api/taskelements?gameId=' + id);
  }
  statusRunGame(id: string): Observable<RunGame> {
    return this.httpClient.post<RunGame>(environment.apiURL + '/api/game/' + id + '/run?action=status', {});
  }
  startRunGame(id: string): Observable<RunGame> {
    const runnerClientId = localStorage.getItem('CLIENT_ID') + '';
    return this.httpClient.post<RunGame>(environment.apiURL + '/api/game/' + id + '/run?action=start', {}, { headers: new HttpHeaders({ runnerClientId: runnerClientId }) });
  }
  assignTask(id: string, taskId: string): Observable<RunGame> {
    const runnerClientId = localStorage.getItem('CLIENT_ID') + '';
    return this.httpClient.post<RunGame>(environment.apiURL + '/api/game/' + id + '/run?action=assignTask', { taskId: taskId }, { headers: new HttpHeaders({ runnerClientId: runnerClientId }) });
  }
  completeTask(id: string, taskId: string): Observable<RunGame> {
    const runnerClientId = localStorage.getItem('CLIENT_ID') + '';
    return this.httpClient.post<RunGame>(environment.apiURL + '/api/game/' + id + '/run?action=completeTask', { taskId: taskId }, { headers: new HttpHeaders({ runnerClientId: runnerClientId }) });
  }
  endRunGame(id: string): Observable<RunGame> {
    const runnerClientId = localStorage.getItem('CLIENT_ID') + '';
    return this.httpClient.post<RunGame>(environment.apiURL + '/api/game/' + id + '/run?action=end', {}, { headers: new HttpHeaders({ runnerClientId: runnerClientId }) });
  }
  resetRunGame(id: string): Observable<RunGame> {
    const runnerClientId = localStorage.getItem('CLIENT_ID') + '';
    return this.httpClient.post<RunGame>(environment.apiURL + '/api/game/' + id + '/run?action=reset', {}, { headers: new HttpHeaders({ runnerClientId: runnerClientId }) });
  }
  pauseRunGame(id: string): Observable<RunGame> {
    const runnerClientId = localStorage.getItem('CLIENT_ID') + '';
    return this.httpClient.post<RunGame>(environment.apiURL + '/api/game/' + id + '/run?action=pause', {}, { headers: new HttpHeaders({ runnerClientId: runnerClientId }) });
  }
}
