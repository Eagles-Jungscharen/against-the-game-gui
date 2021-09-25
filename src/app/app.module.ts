import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RunGameComponent } from './run-game/run-game.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { LoginGameComponent } from './login-game/login-game.component';

@NgModule({
  declarations: [
    AppComponent,
    RunGameComponent,
    EditGameComponent,
    LoginGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
