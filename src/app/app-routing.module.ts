import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditGameComponent } from './edit-game/edit-game.component';
import { LoginGameComponent } from './login-game/login-game.component';
import { RunGameComponent } from './run-game/run-game.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginGameComponent,
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'run/:id',
    component: RunGameComponent,
  },
  {
    path: 'edit/:id',
    component: EditGameComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
