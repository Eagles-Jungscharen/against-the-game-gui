import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GameLoginEvent } from '../models/game-login-event';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  registerNewGame(email: string): Observable<any> {
    return this.httpClient.post(environment.apiURL + '/api/registergame', { email: email });
  }
  editNewGame(code: string, verification: string): Observable<GameLoginEvent> {
    return this.httpClient.post<GameLoginEvent>(environment.apiURL + '/api/checkeditgame', { game: code, verification: verification });
  }
  joinGame(code: string): Observable<GameLoginEvent> {
    return this.httpClient.post<GameLoginEvent>(environment.apiURL + '/api/joingame', { game: code });
  }
}
