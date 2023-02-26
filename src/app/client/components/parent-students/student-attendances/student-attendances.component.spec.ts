import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendancesComponent } from './student-attendances.component';

describe('StudentAttendancesComponent', () => {
  let component: StudentAttendancesComponent;
  let fixture: ComponentFixture<StudentAttendancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAttendancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAttendancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
