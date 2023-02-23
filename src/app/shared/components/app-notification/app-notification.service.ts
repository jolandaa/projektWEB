import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { AppNotificationModule } from './app-notification.module';

@Injectable({
  providedIn: AppNotificationModule
})
export class AppNotificationService {
  private notificationRef?: MatSnackBarRef<any>;

  async show(data = {}) {
    this.close();
    const { ToastComponent } = await import('./toast/toast.component');
    this.notificationRef = this.toast.openFromComponent(ToastComponent, { 
      panelClass: 'app-notification',
      duration: 4000,
      data
    });
  }

  close() {
    if (this.notificationRef) {
      this.notificationRef.dismiss();
    }
  }

  afterClosed() {
    return this.notificationRef?.afterDismissed();
  }

  constructor(private toast: MatSnackBar) { }
}
