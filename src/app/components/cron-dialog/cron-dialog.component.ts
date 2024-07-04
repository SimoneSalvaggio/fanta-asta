import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Player } from '../main/main.component';

@Component({
  selector: 'app-cron-dialog',
  templateUrl: './cron-dialog.component.html',
  styleUrls: ['./cron-dialog.component.scss']
})
export class CronDialog {

  constructor(public dialogRef: MatDialogRef<CronDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.list = data.list;
  }

  public event: EventEmitter<any> = new EventEmitter();

  list: Player[] = [];


}
