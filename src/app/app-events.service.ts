import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import {AppNotificationService} from "./shared/components/app-notification/app-notification.service";
import {
  DEFAULT_ERROR_TOAST,
  DEFAULT_SUCCESS_TOAST,
  ToastStatus
} from "./shared/components/app-notification/toast/toast-model";

interface StateEvent {
  name: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class AppEvents {
  private appState = new Subject<any>();
  appState$ = this.appState.asObservable();

  constructor(private snackbar: MatSnackBar, private notifService: AppNotificationService) {}

  notify(data: StateEvent) {
    this.appState.next(data);
  }

  showSuccessToast(message: string) {
    this.snackbar.open(message, '', {
      duration: 4000,
      panelClass: ['ezlend-success']
    });
  }

  showFailureToast(message: string, duration = 4000) {
    this.snackbar.open(message, '', {
      duration,
      panelClass: ['ezlend-error']
    });
  }

  setAppLoadingState(busy = false) {
    this.appState.next({ name: 'loading', data: busy })
  }
}
