import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-comfirm',
  templateUrl: './dialog-comfirm.component.html',
  styleUrls: ['./dialog-comfirm.component.scss']
})
export class DialogComfirmComponent implements OnInit {
  onOk = new EventEmitter();
  constructor(
    public dialogRef: MatDialogRef<DialogComfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {}
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.onOk.emit(true);
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
