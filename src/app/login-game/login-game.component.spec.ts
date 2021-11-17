import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginGameComponent } from './login-game.component';

describe('LoginGameComponent', () => {
  let component: LoginGameComponent;
  let fixture: ComponentFixture<LoginGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
