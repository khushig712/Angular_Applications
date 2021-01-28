import { TeamAmount } from './../shared/model/teamamount.model';
import { Team } from './../shared/model/team.model';
import { AmtbyRole } from './../shared/model/amtbyrole.model';
import { IplService } from './../ipl.service';
import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { ChartSelectEvent } from 'ng2-google-charts';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teams:Team[] = [];
  teamAmount:TeamAmount[] =[];
  teamRoleAmount:AmtbyRole[]=[];
  constructor(private iplService:IplService) { }

  ngOnInit(): void {
      this.iplService.teamDetails().subscribe(res=>{
          this.teams = res;
      })

      this.iplService.teamAmountDetails().subscribe(res=>{
          this.teamAmount = res;

          const chartData:any =[['Team name', 'Amount']];
          for(let t of this.teamAmount){
            chartData.push([t.teamName,t.amount]);
          }
          //console.log(chartData);

        this.drawChart(chartData);
      })

  }

   public select(event: ChartSelectEvent) {
     this.teamRoleAmount=[];
     console.log(this.teamAmount[event.row].teamName);
     this.iplService.teamAmountbyRole(this.teamAmount[event.row].teamName).subscribe(res=>{
     this.teamRoleAmount = res;

     const chartData:any =[['Role', 'Amount']];
     for(let t of this.teamRoleAmount){
       chartData.push([t.roleName,t.amount]);
     }
     this.drawChart2(chartData, this.teamAmount[event.row]);
   })
   this.pieChart2.dataTable = null;
  }

  drawChart(chartData){
      this.pieChart = {
        chartType: 'ColumnChart',
        dataTable:chartData,
        //firstRowIsData: true,
        options: {'title': 'Amount Spent by Each Team','width':700, 'height':400},
        //onClick: onSelection()
      };
  }

  drawChart2(chartData, team:TeamAmount){
    this.pieChart2 = {
      chartType: 'PieChart',
      dataTable:chartData,
      //firstRowIsData: true,
      options: {'title': `${team.teamName}`,'width':400, 'height':250},
    };
}
public pieChart2: GoogleChartInterface={
  chartType: 'PieChart',
  dataTable:null,
  //firstRowIsData: true,
  options: {'title': ''},
};

  public pieChart: GoogleChartInterface={
    chartType: 'ColumnChart',
    dataTable:null,
    //firstRowIsData: true,
    options: {'title': 'Amount Spent by Each Team','width':700, 'height':400},
  };


}
