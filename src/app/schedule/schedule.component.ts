import { Component, OnInit } from '@angular/core';
import { ScheduleServiceService } from './schedule-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private scheduleService : ScheduleServiceService, private spinner: NgxSpinnerService) { }
  obj = {};
  array = [];
  finalArray = [];
  source: String = "";
  destination: String= "";
  isDisabled: Boolean;
  scheduleArray = [];
  scheduleArray1 = [];
  isbtnDisabled: Boolean;
  count = 1;
  isError: Boolean;
  mapArray = [];
  ngOnInit() {
    localStorage.setItem('count', this.count.toString());
    this.isDisabled = true;
    this.isbtnDisabled = true;
    this.isError = false;
    this.spinner.show();
    this.scheduleService.getBartStations().subscribe(data => {
      this.spinner.hide();
      this.array = data.root.stations.station;
      for(let i in this.array) {
        this.obj = {
          "id": this.array[i].abbr,
          "name": this.array[i].name
        }
        this.finalArray.push(this.obj);
      }
    });
  }

  selectSource(source) {
    this.spinner.show();
    this.source = source;
    this.scheduleArray1 = [];
    this.isDisabled = false;
    if(this.source == this.destination) {
      this.isbtnDisabled = true;
      this.isError = true;
    }else{
      this.isbtnDisabled = false;
      this.isError = false;
    }
    if(this.destination == null || this.destination == "") {
      this.isbtnDisabled = true;
    }
    console.log(source);

    this.scheduleService.getBartStation(this.source).subscribe(data => {
      this.spinner.hide();
      if(this.mapArray.length == 0) {
        let myObj = {
          "lat": data.root.stations.station.gtfs_latitude,
          "long": data.root.stations.station.gtfs_longitude,
          "label": "A",
        }
        this.mapArray.push(myObj);
      }else {
        this.mapArray[0]["lat"]= data.root.stations.station.gtfs_latitude;
        this.mapArray[0]["long"] = data.root.stations.station.gtfs_longitude;
      }
      console.log(this.mapArray);
    })
  }
  selectDestination(destination) {
    this.spinner.show();
    this.destination = destination;
    this.scheduleArray1 = [];
    console.log(destination);
    if(this.source == this.destination) {
      this.isbtnDisabled = true;
      this.isError = true;
    }else{
      this.isbtnDisabled = false;
      this.isError = false;
    }
    this.scheduleService.getBartStation(this.destination).subscribe(data => {
      this.spinner.hide();
      if(this.mapArray.length == 1) {
        let myObj = {
          "lat": data.root.stations.station.gtfs_latitude,
          "long": data.root.stations.station.gtfs_longitude,
          "label": "B"
        }
        this.mapArray.push(myObj);
      }else {
        this.mapArray[1]["lat"]= data.root.stations.station.gtfs_latitude;
        this.mapArray[1]["long"] = data.root.stations.station.gtfs_longitude;
      }
    })
  }

  searchSchedule(){
    this.spinner.show();
    this.scheduleArray1 = [];
    this.scheduleService.getTrips(this.source, this.destination).subscribe(data => {
      console.log(data);
      this.spinner.hide();
      this.scheduleArray = data.root.schedule.request.trip;
      console.log(this.scheduleArray);
      for(let i=0; i< this.scheduleArray.length; i++) {
        let myObj = {
          "source" : data.root.schedule.request.trip[i]["@origin"],
          "destination" : data.root.schedule.request.trip[i]["@destination"],
          "departTime" : data.root.schedule.request.trip[i]["@origTimeMin"],
          "arrivalTime" : data.root.schedule.request.trip[i]["@destTimeMin"],
          "fare" : data.root.schedule.request.trip[i]["@fare"]
        }
        this.scheduleArray1.push(myObj);
      }
      console.log(this.scheduleArray1);
    });
  }

}
