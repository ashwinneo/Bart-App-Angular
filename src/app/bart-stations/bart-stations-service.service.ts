import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BartStationsServiceService {

  constructor(private http: HttpClient) { }
  //url: string = 'http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y';
  url: string = 'http://localhost:8080/stations';
  
  stationName: String;
  getBartStations(): Observable<any> {
    return this.http.get(this.url);
  }

  setStation(name: String) {
    this.stationName = name;
  }
  getStation(){
    return this.stationName;
  }
}
