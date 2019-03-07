import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BartStationServiceService {

  constructor(private http: HttpClient) { }
  url: string = "";
  getBartStation(station): Observable<any> {
    let url = 'http://localhost:8080/station?' + "origin=" + station;
    return this.http.get<any>(url);
  }
}
