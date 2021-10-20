import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

import { RunGameComponent } from './run-game/run-game.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { LoginGameComponent } from './login-game/login-game.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MassTaskDialogComponent } from './edit-game/mass-task-dialog/mass-task-dialog.component';
import { EditTaskDialogComponent } from './edit-game/edit-task-dialog/edit-task-dialog.component';
import { TaskElementComponent } from './run-game/task-element/task-element.component';

@NgModule({
  declarations: [AppComponent, RunGameComponent, EditGameComponent, LoginGameComponent, MassTaskDialogComponent, EditTaskDialogComponent, TaskElementComponent],
  imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule, BrowserAnimationsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatIconModule, MatTableModule, MatDialogModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
