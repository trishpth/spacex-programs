import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpacexService {
  getAllMissionsUrl = 'https://api.spaceXdata.com/v3/launches?limit=100';
  filterUrl = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_success=';
  constructor(private http: HttpClient) { }


  getAllMissions() {
    return this.http.get(this.getAllMissionsUrl);
  }

  getFilteredData(launch,land,year){
    return this.http.get(this.filterUrl+launch+`&land_success=${land}&launch_year=${year}`);

  }


}
