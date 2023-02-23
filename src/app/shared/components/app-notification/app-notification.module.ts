import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ToastComponent } from './toast/toast.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ToastComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatIconModule,
    // SharedDirectivesModule,
  ]
})
export class AppNotificationModule { }
