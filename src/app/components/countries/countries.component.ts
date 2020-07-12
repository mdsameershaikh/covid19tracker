import { Component, OnInit } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';
import{GlobalDataSumarry} from 'src/app/model/globalData'
import { DateWiseData } from 'src/app/model/dateWiseData';
import { GoogleChartComponent, GoogleChartInterface } from 'ng2-google-charts';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';


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
  loading: Boolean = true;
  selectedCountryData: DateWiseData [];
 data: GlobalDataSumarry[];
 countries: string[]= [];
 lineChart: GoogleChartInterface ={
   chartType: 'LineChart' 
 }
  constructor(private service: DataServicesService) { }

  ngOnInit(): void {


    merge(
      this.service.getDateWiseData().pipe(
        map(result =>{
          this.dateWiseData = result 
        })
      ),
      this.service.getGlobalData().pipe(
        map(result=>{     
          this.data = result;
          this.data.forEach(cs =>{
          this.countries.push(cs.country)
        }) })
      )
    ).subscribe({
      complete: ()=>{
        this.updateValues('India')
        this.loading = false;
      }
    })

    
  }

 updateChart(){
   let dataTable = [];
   dataTable.push(['Date' , 'Cases'])
   this.selectedCountryData.forEach(cs=>{
     dataTable.push([cs.date, cs.cases])})
     this.lineChart = {
       chartType: "Linechart", 
      dataTable: dataTable,
       options: {hieght: 500,
      animation:{
        duration: 1000, 
        easing: 'out'
      }
      
      },

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
     this.selectedCountryData = this.dateWiseData[country]
     //console.log(this.selectedCountryDateData);
     this.updateChart()
  }
}
