import { IplComponent } from './ipl.component';
import { PlayerstatComponent } from './playerstat/playerstat.component';
import { TeamComponent } from './team/team.component';
import { PlayerComponent } from './player/player.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

      {
        path:'',
        component:IplComponent,
        children:[
          {
            path:'',
            component:TeamComponent
          },
          {
            path:'players',
            component:PlayerComponent
          },{
            path:'team',
            component:TeamComponent
          },{
            path:'playerstat',
            component:PlayerstatComponent

          }
        ]
      }
];

@NgModule({
  imports: [RouterModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IplRoutingModule { }
