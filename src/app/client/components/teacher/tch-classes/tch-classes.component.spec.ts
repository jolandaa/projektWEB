import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TchClassesComponent } from './tch-classes.component';

describe('TchClassesComponent', () => {
  let component: TchClassesComponent;
  let fixture: ComponentFixture<TchClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TchClassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TchClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
