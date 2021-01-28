import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { IplComponent } from './ipl.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import { IplRoutingModule } from './ipl-routing.module';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';
import { PlayerComponent } from './player/player.component';
import { PlayerstatComponent } from './playerstat/playerstat.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    IplComponent,
    HomeComponent,
    TeamComponent,
    PlayerComponent,
    PlayerstatComponent],
  imports: [
    CommonModule,
    IplRoutingModule,
    HttpClientModule,
    Ng2GoogleChartsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class IplModule { }
