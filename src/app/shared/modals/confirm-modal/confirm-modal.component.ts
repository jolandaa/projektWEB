import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Confirmation {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const DEFAULT_TITLE = 'I18N.UNSAVED CHANGES';
const DEFAULT_MESSAGE = 'I18N.YOUR UNSAVED CHANGES WILL BE LOST.SAVE THE CHANGES BEFORE CLOSING?'
const DEFAULT_CANCEL_LABEL = 'I18N.CANCEL';
const DEFAULT_CONFIRM_LABEL = 'I18N.CONFIRM';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  title = DEFAULT_TITLE;
  message = DEFAULT_MESSAGE;
  confirmButtonLabel = DEFAULT_CONFIRM_LABEL;
  cancelButtonLabel = DEFAULT_CANCEL_LABEL;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Confirmation,
    private dialogRef: MatDialogRef<ConfirmModalComponent>) { }

  ngOnInit() {
    if(this.data) {
      const { 
        title = DEFAULT_TITLE, 
        message = DEFAULT_MESSAGE, 
        cancelText = DEFAULT_CANCEL_LABEL, 
        confirmText = DEFAULT_CONFIRM_LABEL } = this.data;

      this.title = title;
      this.message = message;
      this.confirmButtonLabel = confirmText;
      this.cancelButtonLabel = cancelText;
      console.log(this.data)
    }
  }

  submit() {
    this.dialogRef.close('submit');
  }

  cancel() {
    this.dialogRef.close('cancel');
  }
}
