import { Component, OnInit } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';
import{GlobalDataSumarry} from 'src/app/model/globalData'
import { DateWiseData } from 'src/app/model/dateWiseData';
import { GoogleChartComponent, GoogleChartInterface } from 'ng2-google-charts';


@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  totalConfirmed;
  totalActive;
  totalDeaths;
  totalRecovered;
  dateWiseData;
  selectedCountryDateData: DateWiseData [];
 data: GlobalDataSumarry[];
 countries: string[]= [];
 lineChart: GoogleChartInterface ={
   chartType: 'lineChart' 
 }
  constructor(private service: DataServicesService) { }

  ngOnInit(): void {

    this.service.getDateWiseData().subscribe(result=>{
      console.log(result);
      this.dateWiseData = result
      this.updateChart();
      
    })
    this.service.getGlobalData().subscribe(result=>{
      this.data = result;
      this.data.forEach(cs=>{
      this.countries.push(cs.country)
      })
    }
      )
  }

 updateChart(){
   let dataTable = [];
   dataTable.push(['date' , 'cases'])
   this.selectedCountryDateData.forEach(cs=>{
     dataTable.push([cs.date, cs.cases])})
     this.lineChart = {
       chartType: "linechart", 

       options: {hieght: 500},
     }
    

  } 







  updateValues(country: string){
    console.log(country);
    this.data.forEach(cs=>{
      if(cs.country == country){
        this.totalActive = cs.active
        this.totalConfirmed = cs.confirmed
        this.totalDeaths = cs.deaths
        this.totalRecovered = cs.recovered
      }
    })
     this.selectedCountryDateData = this.dateWiseData[country]
     //console.log(this.selectedCountryDateData);
     this.updateChart()
  }
}
