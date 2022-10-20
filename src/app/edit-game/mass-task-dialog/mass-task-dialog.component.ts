import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

export enum MassTaskEventType {
  CANCEL,
  CREATE,
}
export interface MassTaskEvent {
  eventType: MassTaskEventType;
  count: number;
  prefix: string;
  postfix: string;
}

@Component({
  selector: 'app-mass-task-dialog',
  templateUrl: './mass-task-dialog.component.html',
  styleUrls: ['./mass-task-dialog.component.scss'],
})
export class MassTaskDialogComponent implements OnInit {
  fgMassCreation = new UntypedFormGroup({
    count: new UntypedFormControl(10, [Validators.required, Validators.min(1)]),
    prefix: new UntypedFormControl(''),
    postfix: new UntypedFormControl(''),
  });
  constructor(public dialogRef: MatDialogRef<Component>) {}

  ngOnInit(): void {}

  cancel() {
    this.dialogRef.close({ eventType: MassTaskEventType.CANCEL });
  }
  create() {
    this.dialogRef.close({ eventType: MassTaskEventType.CREATE, count: this.fgMassCreation.get('count')?.value, prefix: this.fgMassCreation.get('prefix')?.value, postfix: this.fgMassCreation.get('postfix')?.value });
  }
}
