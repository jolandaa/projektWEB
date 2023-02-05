import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSystemAdminUsersComponent } from './edit-system-admin-users.component';

describe('EditSystemAdminUsersComponent', () => {
  let component: EditSystemAdminUsersComponent;
  let fixture: ComponentFixture<EditSystemAdminUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSystemAdminUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSystemAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
