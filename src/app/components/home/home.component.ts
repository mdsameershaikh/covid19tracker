import { Component, OnInit } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';
import { Observable} from 'rxjs'
import { GlobalDataSumarry } from 'src/app/model/globalData';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 totalConfirmed  = 0;
 totalActive =0;
 totalDeaths = 0;
 totalRecovered = 0;
 globalData : GlobalDataSumarry [] ;
 pieChart: GoogleChartInterface ={
  chartType: 'PieChart'
 }

 ColumnChart: GoogleChartInterface ={
  chartType: 'ColumnChart'
 }

 
  constructor(private dataService: DataServicesService) { }

  initChart(){
    let datatable = [];
    datatable.push(["Country", "Cases"])
    this.globalData.forEach(cs=>{
      if(cs.confirmed > 200000)
      datatable.push([
        cs.country, cs.confirmed
      ])
    })

    this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable,

      //firstRowIsData: true,
      options: {height : 600},
    };

    this.ColumnChart ={
      chartType: 'ColumnChart',
      dataTable: datatable,

      //firstRowIsData: true,
      options: {height : 600},
    }

  }
  ngOnInit(): void {

  

    this.dataService.getGlobalData().subscribe({
      next: (result)=>{
     console.log(result);
      this.globalData = result; 
     result.forEach(cs=>{
      if(!Number.isNaN(cs.confirmed)){
     this.totalActive +=cs.active
     this.totalConfirmed +=cs.confirmed
     this.totalDeaths +=cs.deaths
     this.totalRecovered +=cs.recovered}
     })
       this.initChart();
      }
    })
  }
  
}
