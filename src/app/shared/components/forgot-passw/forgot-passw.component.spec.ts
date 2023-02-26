import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswComponent } from './forgot-passw.component';

describe('ForgotPasswComponent', () => {
  let component: ForgotPasswComponent;
  let fixture: ComponentFixture<ForgotPasswComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
