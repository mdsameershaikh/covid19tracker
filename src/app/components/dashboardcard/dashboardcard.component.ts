import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboardcard',
  templateUrl: './dashboardcard.component.html',
  styleUrls: ['./dashboardcard.component.css']
})
export class DashboardcardComponent implements OnInit {
@Input('totalConfirmed')
totalConfirmed;
@Input('totalActive')
totalActive;
@Input('totalDeaths')
totalDeaths;
@Input('totalRecovered')
totalRecovered;


  constructor() { }

  ngOnInit(): void {
  }

}
