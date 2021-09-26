import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

enum LoginStatus {
  START,
  EDIT,
  CREATE,
  REGISTER,
}

@Component({
  selector: 'app-login-game',
  templateUrl: './login-game.component.html',
  styleUrls: ['./login-game.component.scss'],
})
export class LoginGameComponent implements OnInit {
  private status: LoginStatus = LoginStatus.START;
  codeJoinGameControl = new FormControl('', checkCodeFormat());
  codeEditGameControl = new FormControl('', checkCodeFormat());
  codeEditVerificationGameControl = new FormControl('', checkCodeFormat());
  registerEMailControl = new FormControl('');

  constructor() {}

  ngOnInit(): void {}

  startButtonDisabled(): boolean {
    return this.status == LoginStatus.EDIT || this.codeJoinGameControl.invalid;
  }
  newButtonDisabled(): boolean {
    return this.status != LoginStatus.START;
  }
  editButtonDisabled(): boolean {
    return this.status == LoginStatus.EDIT || this.codeEditGameControl.invalid;
  }
  cancelButtonDisabled(): boolean {
    return this.status == LoginStatus.START;
  }
  showEMailAddress(): boolean {
    return this.status == LoginStatus.CREATE;
  }
  showVerification(): boolean {
    return false;
  }
  showEditButton(): boolean {
    return this.status == LoginStatus.START;
  }

  doCancel() {
    this.status = LoginStatus.START;
  }
  doJoinGame() {}
  doNewGame() {
    this.status = LoginStatus.CREATE;
  }
  doEditGame() {
    this.status = LoginStatus.EDIT;
  }
}

export function checkCodeFormat(): ValidatorFn {
  const nameRex = new RegExp('\\d\\d\\d-\\d\\d\\d-\\d\\d\\d$');
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value + '';
    const valid = nameRex.test(value);
    return valid ? null : { chekCodeFormat: { value: control.value } };
  };
}
