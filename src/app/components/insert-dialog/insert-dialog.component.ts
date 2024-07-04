import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Player } from '../main/main.component';

@Component({
  selector: 'app-insert-dialog',
  templateUrl: './insert-dialog.component.html',
  styleUrls: ['./insert-dialog.component.scss']
})
export class InsertDialogComponent {

  player: Player = {
    id: "",
    mantra: "",
    nome: "",
    qta: "",
    qti: "",
    ruolo: "",
    squadra: "",
    costo: 0
  };

  isForTeam: boolean = false;

  public event: EventEmitter<any> = new EventEmitter();

  message: string = '';

  constructor(public dialogRef: MatDialogRef<InsertDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.player = data.player;
    this.message = data.message;
    this.isForTeam = data.isForTeam;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.event.emit(this.message);
    this.dialogRef.close();
  }

  onSvincClick(): void {
    this.player.costo = 0;
    this.event.emit( {data: this.player} );
    this.dialogRef.close();
  }

}
