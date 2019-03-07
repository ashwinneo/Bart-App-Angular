import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleServiceService {

  constructor(private http: HttpClient) { }
  url: string = 'http://localhost:8080/stations';
  getBartStations(): Observable<any> {
    return this.http.get(this.url);
  }
  
  getBartStation(station): Observable<any> {
    let url = 'http://localhost:8080/station?' + "origin=" + station;
    return this.http.get<any>(url);
  }

  getTrips(source,destination): Observable<any> {
    let url = 'http://localhost:8080/trips?source=' + source + '&destination=' + destination;
    return this.http.get<any>(url);
  }
}
