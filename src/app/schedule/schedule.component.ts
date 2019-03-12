import { Component, OnInit } from '@angular/core';
import { ScheduleServiceService } from './schedule-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
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
  showMap: Boolean;
  isCount: Boolean;
  counts: string = "";
  nextTrain = {};
  isTimeLeft: Boolean;
  ngOnInit() {
    this.isTimeLeft = false;
    this.isCount = true;
    if (localStorage.getItem("count") === null) {
      localStorage.setItem("count", '1');
    }else{
      let count = Number(localStorage.getItem("count")) + 1;
      this.counts= count.toString();
      localStorage.setItem("count", this.counts);
    }
    setTimeout(() => {
      this.isCount = false;
    }, 5000);
    this.showMap = false;
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
  doSomething(val) {
    console.log(val);
  }
  selectSource(source) {
    this.spinner.show();
    this.source = source;
    this.scheduleArray1 = [];
    this.isDisabled = false;
    this.showMap = false;
    this.isTimeLeft = false;
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
          "lat": Number(data.root.stations.station.gtfs_latitude),
          "lng": Number(data.root.stations.station.gtfs_longitude)
        }
        this.mapArray.push(myObj);
      }else {
        this.mapArray[0]["lat"]= Number(data.root.stations.station.gtfs_latitude);
        this.mapArray[0]["lng"] = Number(data.root.stations.station.gtfs_longitude);
      }
      console.log(this.mapArray);
    })
  }
  selectDestination(destination) {
    this.spinner.show();
    this.showMap = false;
    this.isTimeLeft = false;
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
          "lat": Number(data.root.stations.station.gtfs_latitude),
          "lng": Number(data.root.stations.station.gtfs_longitude)
        }
        this.mapArray.push(myObj);
      }else {
        this.mapArray[1]["lat"]= Number(data.root.stations.station.gtfs_latitude);
        this.mapArray[1]["lng"] = Number(data.root.stations.station.gtfs_longitude);
      }
    })
  }

  searchSchedule(){
    this.spinner.show();
    this.scheduleArray1 = [];
    this.showMap = true;
    this.scheduleService.getTrips(this.source, this.destination).subscribe(data => {
      console.log(data);
      this.spinner.hide();
      this.scheduleArray = data.root.schedule.request.trip;
      console.log(this.scheduleArray);
      let date = new Date();
      console.log(date);
      let h = date.getHours()% 12 || 12;
      let m = date.getMinutes();
      let seconds = h * 60 * 60 + m * 60;
      let time: String  = data.root.schedule.request.trip[0]["@origTimeMin"];
      let split: any = time.split(" ");
      let timeSplit: String = split[0].trim();
      let time1:any = timeSplit.split(":");
      let hours = time1[0].trim();
      let min = time1[1].trim();
      let timeLeft =  (hours * 60 * 60 + min * 60) - (seconds);
      if(timeLeft < 0) {
        timeLeft = -(timeLeft);
      }
      this.nextTrain = {
        "leftTime" : timeLeft
      }
      this.isTimeLeft = true;
      setTimeout(() => {
        this.isTimeLeft = false;
      }, 30000);
      for(let i=0; i< this.scheduleArray.length; i++) {
        // var now = moment().format('LT');
        // var nowTime = moment(now, "HH:mm a");
        // var source = data.root.schedule.request.trip[i]["@origTimeMin"];
        // var sourceTime = moment(source, "HH:mm a");
        // // var startTime = moment('03:31am', "HH:mm a");
        // // var endTime = moment('03:30am', "HH:mm a");
        // if (nowTime.isAfter(sourceTime)){
        //   console.log(true);
        // }
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
