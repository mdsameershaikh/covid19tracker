import { Component, OnInit } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';
import { GlobalDataSumarry } from 'src/app/model/globalData';


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
 loading:Boolean = true;
 globalData : GlobalDataSumarry [] ;
 datatable = [];
 chart ={
   PieChart: "PieChart",
   ColumnChart: "ColumnChart",
   height : 600,
   options: {
    animation:{
      duration: 1000, 
      easing: 'out'
    },
    is3D: true
  }
 }
 
  constructor(private dataService: DataServicesService) { }


  updateChart(input: HTMLInputElement){
    console.log(input.value);
    this.initChart(input.value)
     }
  initChart(caseType: String){
    this.datatable = [];
   // this.datatable.push(["Country", "Cases"])
    this.globalData.forEach(cs =>{
      let value: number;
      if(caseType == 'c') {
      if(cs.confirmed > 20000)
      value= cs.confirmed }

         if(caseType == 'a')
         if(cs.active > 20000)
         value = cs.active 
       
       if(caseType == 'd')
      if(cs.deaths > 10000)
      value = cs.deaths
      
      if(caseType == 'r')
      if(cs.recovered > 20000)
      value = cs.recovered
      

      this.datatable.push([
        cs.country, value
      ])
    })

    console.log(this.datatable);
    
     
    };

   

  
    ngOnInit(): void {

  

    this.dataService.getGlobalData().subscribe({
      next: (result)=>{
    
      this.globalData = result; 
      this.loading = false
     result.forEach(cs=>{
      if(!Number.isNaN(cs.confirmed)){
     this.totalActive +=cs.active
     this.totalConfirmed +=cs.confirmed
     this.totalDeaths +=cs.deaths
     this.totalRecovered +=cs.recovered}
     })
       this.initChart('c');
      }
    })
  }
  
  
}
