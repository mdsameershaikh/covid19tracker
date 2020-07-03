import { Component, OnInit } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';
import{GlobalDataSumarry} from 'src/app/model/globalData'


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

 data: GlobalDataSumarry[];
 countries: string[]= [];
  constructor(private service: DataServicesService) { }

  ngOnInit(): void {
    this.service.getGlobalData().subscribe(result=>{
      this.data = result;
      this.data.forEach(cs=>{
      this.countries.push(cs.country)
      })
    }
      )
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

  }
}
