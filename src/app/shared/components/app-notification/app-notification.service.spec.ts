import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppNotificationModule } from './app-notification.module';

import { AppNotificationService } from './app-notification.service';

describe('AppNotificationService', () => {
  let service: AppNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppNotificationModule
      ]
    });
    service = TestBed.inject(AppNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


