import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Player } from '../main/main.component';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss']
})
export class PlayerDetailsComponent implements OnInit {

  player: any = null;

  roles: any;
  teams: any;
  count: any;

  constructor(public dialogRef: MatDialogRef<PlayerDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.player = data.player;
    this.roles = data.roles;
    this.teams = data.teams;
    this.count = data.count;
  }

  ngOnInit(): void {
  }

}
