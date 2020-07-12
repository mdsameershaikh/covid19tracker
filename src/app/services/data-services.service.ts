import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { GlobalDataSumarry } from '../model/globalData';
import { DateWiseData } from '../model/dateWiseData';


@Injectable({
  providedIn: 'root'
})
export class DataServicesService {

  private Globaldataurl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/07-11-2020.csv`
  private dateWiseUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`
  
  constructor(private http: HttpClient) { }

  getDateWiseData(){
    return this.http.get(this.dateWiseUrl, {responseType: "text"})
    .pipe(map(result =>{
      let  rows = result.split('\n');
      //console.log(rows);
      let mainaData = {}
      let header = rows[0];
      let dates = header.split(/,(?=\S)/);
      dates.splice(0 , 4);
      rows.splice(0 , 1)
      
      rows.forEach(row=>{
        let cols =  row.split(/,(?=\S)/);
        let con = cols[1];
        cols.splice(0 , 4);
       // console.log(con, cols);
        mainaData[con] =[0]
        cols.forEach((value, index)=>{
          let dw: DateWiseData ={
            cases: +value, 
            country: con,
            date : new Date(Date.parse(dates[index]))

          }
        mainaData[con].push(dw)
        })
      })
      
     // console.log(mainaData);
      
      return mainaData
    }))

  }

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
