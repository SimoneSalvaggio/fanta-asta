import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { read, utils } from 'xlsx';
import { InsertDialogComponent } from '../insert-dialog/insert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

export interface Player {
  id: string,
  ruolo: string;
  nome: string;
  squadra: string;
  mantra: string;
  qta: string;
  qti: string;
  costo: number;
  fvmm?: any;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllInLS();
  }

  playersList: Player[] = [];
  removedList: Player[] = [];
  fantaTeams: {name:string,players:Player[]}[] = [
    {name:'Paul', players: []},
    {name:'Foca', players: []},
    {name:'Mauri', players: []},
    {name:'Omar', players: []},
    {name:'Aggio', players: []},
    {name:'Umbe', players: []},
    {name:'Camping', players: []},
    {name:'Guala', players: []},
    {name:'Spada', players: []},
    {name:'Berra', players: []},
  ];

  uploadFile: any;

  handleImport($event: any) {
    const files = $event.target.files;
    if (files.length) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event: any) => {
            const wb = read(event.target.result);
            const sheets = wb.SheetNames;

            if (sheets.length) {
                const rows: Player[] = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                this.playersList = rows;
            }
        }
        reader.readAsArrayBuffer(file);
    }
  }

  displayedColumnsFree: string[] = ['mantra', 'nome', 'squadra','qta', 'actions'];
  displayedColumns: string[] = ['mantra', 'nome', 'squadra','qta', 'costo', 'actions'];
  randomId: string = '100000';
  allDatas: {
    playersList: Player[],
    fantaTeams: {name:string, players:Player[]}[],
    lastPosition: string
  } = {
    playersList: [],
    fantaTeams: [
      {name:'Paul', players: []},
      {name:'Foca', players: []},
      {name:'Mauri', players: []},
      {name:'Omar', players: []},
      {name:'Aggio', players: []},
      {name:'Umbe', players: []},
      {name:'Camping', players: []},
      {name:'Guala', players: []},
      {name:'Spada', players: []},
      {name:'Berra', players: []},
    ],
    lastPosition: this.randomId
  };

  saveAllInLS(){
    this.allDatas = {
      playersList: [],
      fantaTeams: [
        {name:'Paul', players: []},
        {name:'Foca', players: []},
        {name:'Mauri', players: []},
        {name:'Omar', players: []},
        {name:'Aggio', players: []},
        {name:'Umbe', players: []},
        {name:'Camping', players: []},
        {name:'Guala', players: []},
        {name:'Spada', players: []},
        {name:'Berra', players: []},
      ],
      lastPosition: this.randomId
    };
    const key: string = "fanta-asta-saved-data";
    console.log("SAVING DATAS, KEY: " + key);
    console.log("this.fantaTeams",this.fantaTeams)
    this.allDatas.fantaTeams = this.fantaTeams;
    this.allDatas.playersList = this.playersList;
    this.allDatas.lastPosition = this.randomId;
    localStorage.setItem(key,JSON.stringify(this.allDatas));
  }
  
  getAllInLS(){
    const key: string = "fanta-asta-saved-data";
    this.allDatas = JSON.parse(""+localStorage.getItem(key));
    console.log("alldatas",this.allDatas)
    if (this.allDatas) {
      this.fantaTeams = this.allDatas.fantaTeams;
      this.playersList = this.allDatas.playersList;
      this.randomId = this.allDatas.lastPosition;
    }
  }

  resetAllData(){
    let dialogRef = this.dialog.open(InsertDialogComponent, {
      width: '450px',
      data: { message: 'Ma sei sicuro?' }
    });
    dialogRef.componentInstance.event.subscribe(
      (result) => {
        if(result){
          let dialogRef = this.dialog.open(InsertDialogComponent, {
            width: '450px',
            data: { message: 'Ma proprio sicuro sicuro? Perderai tutto così' }
          });
          dialogRef.componentInstance.event.subscribe(
            (result) => {
              if(result){
                this.fantaTeams = [
                  {name:'Paul', players: []},
                  {name:'Foca', players: []},
                  {name:'Mauri', players: []},
                  {name:'Omar', players: []},
                  {name:'Aggio', players: []},
                  {name:'Umbe', players: []},
                  {name:'Camping', players: []},
                  {name:'Guala', players: []},
                  {name:'Spada', players: []},
                  {name:'Berra', players: []},
                ];;
                this.playersList = [];
                this.randomId = '100000';
                this.saveAllInLS();
              }
            }
          );
        }
      }
    );
  }

  teams = ["Atalanta","Bologna","Cagliari","Como","Empoli","Fiorentina","Genoa","Inter","Juventus","Lazio","Lecce","Milan","Monza","Napoli","Parma","Roma","Torino","Udinese","Venezia","Verona"]

  showFilters: boolean = false;
  showUpload: boolean = false;
  secure: boolean = true;
  secureButtons: boolean = true;

  setSecureOnOff(){
    this.secure = !this.secure;
  }

  scarta() {
    if(this.secure){
      let dialogRef = this.dialog.open(InsertDialogComponent, {
        width: '450px',
        data: { 'message': 'Sei sicuro di voler scartare ' + this.playersList[+this.randomId].nome + ' ?' }
      });
      dialogRef.componentInstance.event.subscribe(
        (result) => {
          if(result){
            const [removedPlayer] = this.playersList.splice(+this.randomId, 1);
            this.removedList.push(removedPlayer);
            this.valueOffer = 1;
            this.extractNewFreePlayer();
            this.saveAllInLS();
          }
        }
      );
    } else {
      const [removedPlayer] = this.playersList.splice(+this.randomId, 1);
      this.removedList.push(removedPlayer);
      this.valueOffer = 1;
      this.extractNewFreePlayer();
      this.saveAllInLS();
    }
  }

  assegna(teamNumber: number){
    if (this.valueOffer > 0) {
      if(this.secure){
        let dialogRef = this.dialog.open(InsertDialogComponent, {
          width: '450px',
          data: { 'message': 'Sei sicuro di voler assegnare ' + this.playersList[+this.randomId].nome + ' a ' + this.fantaTeams[teamNumber].name.toUpperCase() + '?' }
        });
        dialogRef.componentInstance.event.subscribe(
          (result) => {
            if(result){
              const [assignedPlayer] = this.playersList.splice(+this.randomId, 1);
              assignedPlayer.costo = this.valueOffer;
              this.fantaTeams[teamNumber].players.push(assignedPlayer);
              this.valueOffer = 1;
              this.extractNewFreePlayer();
              this.saveAllInLS();
            }
          }
        );
      } else {
        const [assignedPlayer] = this.playersList.splice(+this.randomId, 1);
        assignedPlayer.costo = this.valueOffer;
        this.fantaTeams[teamNumber].players.push(assignedPlayer);
        this.valueOffer = 1;
        this.extractNewFreePlayer();
        this.saveAllInLS();
      }
    }
  }

  cronVisible: boolean = false;

  valueOffer: number = 0;

  showCron(){
    this.cronVisible = !this.cronVisible;
    console.log("this.removedList",this.removedList)
  }

  removePlayerFromTeam(teamPosition: number, playerPosition: number){
    const [restoredPlayer] = this.fantaTeams[teamPosition].players.splice(playerPosition, 1);
    this.playersList.push(restoredPlayer);
    this.randomId = ''+(this.playersList.length-1);
  }

  idToSearch: string = '';

  searchPlayerId(){
    console.log("this.idToSearch",this.idToSearch)
    console.log("this.playersList",this.playersList)
    const index = this.playersList.findIndex(player => player.id == this.idToSearch || player.nome.toUpperCase() == this.idToSearch.toUpperCase())
    if (index !== -1) {
      this.randomId = index+'';
    }
  }

  restore(elem: Player){
    const index = this.removedList.findIndex(player => player.id === elem.id);
    if (index !== -1) {
      const [restoredPlayer] = this.removedList.splice(index, 1);
      this.playersList.push(restoredPlayer);
    }
    this.randomId = ''+(this.playersList.length-1);
  }

  calculateCreditsUsed(players: Player[]){
    var total: number = 0;
    for (let i = 0; i < players.length; i++) {
      const element = players[i];
      total += +element.costo;
    }
    return +total;
  }

  toggleShowFilters(){
    this.showFilters = ! this.showFilters;
  }

  toggleShowUpload(){
    this.showUpload = ! this.showUpload;
  }

  extractNewFreePlayer(){
    this.randomId = this.randomIntFromInterval();
  }

  calculateBestRole(player: Player){
    if(player && player.mantra){
      if (player.mantra.includes("Por")) {
        return "orange";
      } else if(player.mantra.includes("Dc")) {
        return "lightgreen";
      } else if(player.mantra.includes("Dd")) {
        return "green";
      } else if(player.mantra.includes("Ds")) {
        return "green";
      } else if(player.mantra.includes("M")) {
        return "cyan";
      } else if(player.mantra.includes("C")) {
        return "lightblue";
      } else if(player.mantra.includes("E")) {
        return "yellowgreen";
      } else if(player.mantra.includes("W")) {
        return "purple";
      } else if(player.mantra.includes("T")) {
        return "darkblue";
      } else if(player.mantra.includes("A")) {
        return "lightsalmon";
      } else if(player.mantra.includes("Pc")) {
        return "red";
      } else {
        return "white";
      }
    } else {
      return "ROLE"
    }
  }

  calculateRoleNumber(player: Player){
    let counter = 1;
    if (player && player.mantra) {
      for (let i = 0; i < player.mantra.length; i++) {
        if (player.mantra[i]==";") {
          counter++;
        }
      }
      if (counter==1) {
        return "black";
      } else if(counter==2) {
        return "orange";
      } else if(counter==3) {
        return "red";
      } else {
        return "fucsia";
      }
    } else {
      return "black";
    }
  }

  randomIntFromInterval() { 
    return ''+Math.floor(Math.random() * (this.playersList.length))
  }

  showModuli: boolean = false;

    showAbbinamentiPortieri: boolean = false;

    openConfirmDialog(){
      let dialogRef = this.dialog.open(InsertDialogComponent, {
        width: '450px',
        data: { 'message': 'message here' }
      });
      dialogRef.componentInstance.event.subscribe(
        (result) => {
          if(result){
            
          }
        }
      );
    }



}
