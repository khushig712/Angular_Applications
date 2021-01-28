import { Component, OnInit } from '@angular/core';
import {Player} from './../shared/model/player.model';
import { MaxAmtPlayers } from './../shared/model/maxamtplayers.model';
import { IplService } from './../ipl.service';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-playerstat',
  templateUrl: './playerstat.component.html',
  styleUrls: ['./playerstat.component.css']
})
export class PlayerstatComponent implements OnInit {

  playerList:MaxAmtPlayers[]=[];
  constructor(private iplService:IplService) { }
  ngOnInit(): void {
    this.iplService.getMaxPlayers().subscribe(res=>{
      this.playerList=res;
    })

    this.iplService.getAllPlayers().subscribe(res=>{
      this.allPlayers=res;
    })
  }
  searchStr:string="";
  searchResPlayers:Player[] = [];
  allPlayers:Player[]=[];

  search(){
        if(this.searchStr.trim().length!=0){
         this.searchResPlayers = this.allPlayers.filter(p=>p.name.toLocaleLowerCase().includes(this.searchStr.toLocaleLowerCase()));
      }else{
          this.searchResPlayers = [];
      }
  }

}
