import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

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
  loadRegister = false;
  codeJoinGameControl = new UntypedFormControl('', checkCodeFormat());
  codeEditGameControl = new UntypedFormControl('', checkCodeFormat());
  codeEditVerificationGameControl = new UntypedFormControl('', checkSecureFormat());
  registerEMailControl = new UntypedFormControl('', [Validators.required, Validators.email]);

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  startButtonDisabled(): boolean {
    return this.status == LoginStatus.EDIT || this.codeJoinGameControl.invalid;
  }
  newButtonDisabled(): boolean {
    return this.status != LoginStatus.START;
  }
  editButtonDisabled(): boolean {
    return (this.status == LoginStatus.EDIT && this.codeEditVerificationGameControl.invalid) || this.codeEditGameControl.invalid;
  }
  cancelButtonDisabled(): boolean {
    return this.status == LoginStatus.START;
  }
  showEMailAddress(): boolean {
    return this.status == LoginStatus.CREATE;
  }
  showVerification(): boolean {
    return this.status == LoginStatus.EDIT;
  }
  showEditButton(): boolean {
    return this.status == LoginStatus.START;
  }
  showRegister(): boolean {
    return this.status == LoginStatus.CREATE;
  }

  doCancel() {
    this.status = LoginStatus.START;
  }
  doJoinGame() {
    this.loginService.joinGame(this.codeJoinGameControl.value).subscribe((result) => {
      this.router.navigateByUrl('run/' + result.gameId);
    });
  }
  doNewGame() {
    this.status = LoginStatus.CREATE;
  }
  doEditGame() {
    if (this.status == LoginStatus.START) {
      this.status = LoginStatus.EDIT;
    } else {
      this.loginService.editNewGame(this.codeEditGameControl.value, this.codeEditVerificationGameControl.value).subscribe((result) => {
        localStorage.setItem('ID_' + result.gameId, this.codeEditVerificationGameControl.value);
        this.router.navigateByUrl('edit/' + result.gameId);
      });
    }
  }
  doRegisterGame() {
    this.loadRegister = true;
    this.loginService.registerNewGame(this.registerEMailControl.value).subscribe((result) => {
      this.codeEditGameControl.setValue(result.game, { emitEvent: false });
      this.loadRegister = false;
      this.status = LoginStatus.EDIT;
    });
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
export function checkSecureFormat(): ValidatorFn {
  const nameRex = new RegExp('\\d\\d-\\d\\d\\d\\d\\d-\\d\\d\\d\\d$');
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value + '';
    const valid = nameRex.test(value);
    return valid ? null : { chekCodeFormat: { value: control.value } };
  };
}
