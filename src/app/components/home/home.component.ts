import { Component, OnInit } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';
import { Observable} from 'rxjs'
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
 globalData : GlobalDataSumarry [] ;

  constructor(private dataService: DataServicesService) { }

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
        
      }
    })
  }
  
}
