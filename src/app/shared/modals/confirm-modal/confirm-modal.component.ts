import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Confirmation {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const DEFAULT_TITLE = 'Unsaved changes';
const DEFAULT_MESSAGE = 'Your unsaved changes will be lost.Save the changes before closing?'
const DEFAULT_CANCEL_LABEL = 'Cancel';
const DEFAULT_CONFIRM_LABEL = 'Confirm';

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
