import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassTaskDialogComponent } from './mass-task-dialog.component';

describe('MassTaskDialogComponent', () => {
  let component: MassTaskDialogComponent;
  let fixture: ComponentFixture<MassTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MassTaskDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MassTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
