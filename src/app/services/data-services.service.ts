import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { GlobalDataSumarry } from '../model/globalData';


@Injectable({
  providedIn: 'root'
})
export class DataServicesService {

  private Globaldataurl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/07-01-2020.csv`
  constructor(private http: HttpClient) { }

  getGlobalData(){
    return this.http.get(this.Globaldataurl, {responseType: 'text'}).pipe(
      map(result=>{
       let data: GlobalDataSumarry[] = [];
       let raw = {}
         let rows = result.split('\n');
         rows.splice(0,1);
         //console.log(rows);
         rows.forEach(row=>{
           let cols = row.split(/,(?=\S)/);

           let cs = {
            country: cols[3],
            confirmed: +cols[7],
            deaths: +cols[8],
            recovered: +cols[9],
            active: +cols[10],

          };

          let temp = raw[cs.country];
          if(temp){
            temp.active = cs.active + temp.active
            temp.confirmed = cs.confirmed + temp.confirmed
            temp.deaths = cs.deaths + temp.deaths
            temp.recovered = cs.recovered + temp.recovered

            raw[cs.country] = temp;
            
            
          }
          else {
          raw[cs.country] = cs
          }
           
           
         })
           
           
        return <GlobalDataSumarry[]>Object.values(raw)
      })
    )
  }
}
