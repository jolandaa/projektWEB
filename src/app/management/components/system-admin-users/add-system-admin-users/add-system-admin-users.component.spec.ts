import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSystemAdminUsersComponent } from './add-system-admin-users.component';

describe('AddSystemAdminUsersComponent', () => {
  let component: AddSystemAdminUsersComponent;
  let fixture: ComponentFixture<AddSystemAdminUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSystemAdminUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSystemAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
