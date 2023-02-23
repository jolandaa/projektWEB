import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ToastData } from './toast-model';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  ngOnInit() { }

  close() {
    this.toast.dismiss();
  }

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: ToastData, private toast: MatSnackBarRef<ToastComponent>) { }

}
