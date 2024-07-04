import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { InsertDialogComponent } from './components/insert-dialog/insert-dialog.component';
import { PlayerDetailsComponent } from './components/player-details/player-details.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CronDialog } from './components/cron-dialog/cron-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    InsertDialogComponent,
    CronDialog,
    PlayerDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
