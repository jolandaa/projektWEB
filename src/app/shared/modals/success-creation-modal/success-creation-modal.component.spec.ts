import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessCreationModalComponent } from './success-creation-modal.component';

describe('SuccessCreationModalComponent', () => {
  let component: SuccessCreationModalComponent;
  let fixture: ComponentFixture<SuccessCreationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessCreationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
