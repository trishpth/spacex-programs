import { Component, OnInit } from '@angular/core';
import {SpacexService} from './services/spacex.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'spacex-program';
  allMissions:any;
  launchyears = [];
  yearSelected = '';
  launchSelected='';
  landingSelected = '';
  fetchingData = true;
  selectedYearValue= '';
  
  constructor(private spacexService:SpacexService,private _DomSanitizationService: DomSanitizer){

  }

  ngOnInit(){
    this.spacexService.getAllMissions().subscribe((data)=>{
      console.log(data);
      this.allMissions = data;
      this.fetchingData = false;
      this.allMissions.forEach(element => {
        
        if(this.launchyears.indexOf(element.launch_year)==-1){
          this.launchyears.push(element.launch_year);
        }
      });
    })
  }

  filterData(val){
    this.selectedYearValue = val;
    this.fetchingData = true;
    this.yearSelected = val;
    this.spacexService.getFilteredData(this.launchSelected,this.landingSelected,this.yearSelected).subscribe((data)=>{
      console.log(data);
      this.fetchingData = false;
      this.allMissions = data;
    })
  }

  onLaunchClick(val){
    this.launchSelected = val;
    this.filterData(this.yearSelected);
  }

  onLandingClick(val){
    this.landingSelected = val;
    this.filterData(this.yearSelected);

  }

}
