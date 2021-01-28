import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Player} from './../shared/model/player.model';
import {TeamRole} from './../shared/model/teamrole.model';
import { IplService } from './../ipl.service';
import { GoogleChartInterface } from 'ng2-google-charts';
import { ChartSelectEvent } from 'ng2-google-charts';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  //teams = new FormControl();

  teamList: string[] = ["MI", "CSK", "RCB", "SRH", "DC", "KXIP","RR","KKR"];
  teamForm = new FormGroup({
      team: new FormControl('', Validators.required)
  });
  playerList:Player[]=[];
  teamRole:TeamRole[]=[];
  teamLabel:string="";
  chartData:any =[['Role', 'Number of Players']];
  submit(){
    //alert(this.teamForm.controls['team'].value);
    this.teamLabel=this.teamForm.controls['team'].value;

    this.iplService.teamPlayerDetails(this.teamLabel).subscribe(res=>{
      this.playerList=res;
    })

    this.iplService.teamRoles(this.teamLabel).subscribe(res=>{
        this.teamRole = res;
        for(let t of this.teamRole){
          this.chartData.push([t.roleName,(t.count)]);
        }

      this.pieChart={
        chartType: 'PieChart',
        dataTable:this.chartData,
        //firstRowIsData: true,
        //dataTable:null,
        options: {'title': '','width':500, 'height':400},
      };
      console.log(this.pieChart);
      this.status=true;
      // this.pieChart.draw();
    })

  }
  playerByRole:Player[]=[];
  public select(event: ChartSelectEvent) {
      this.playerByRole=[];
      console.log(this.teamRole[event.row].roleName);
      console.log(this.teamLabel);
      this.iplService.getPlayersbyTeamandRole(this.teamLabel,this.teamRole[event.row].roleName).subscribe(res=>{
        this.playerByRole = res;
    })

  }

  public pieChart: GoogleChartInterface={
    chartType: 'PieChart',
    dataTable: null,
    //firstRowIsData: true,
    //dataTable:null,
    options: {'title': '','width':600, 'height':400},


  };

  status=false;

  constructor(private iplService:IplService) { }

  ngOnInit(): void {
    //console.log(this.teamList);
  }

}
