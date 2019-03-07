import { Component, OnInit } from '@angular/core';
import { BartStationsServiceService } from '../bart-stations/bart-stations-service.service';
import { BartStationServiceService } from './bart-station-service.service';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-bart-station',
  templateUrl: './bart-station.component.html',
  styleUrls: ['./bart-station.component.css']
})
export class BartStationComponent implements OnInit {

  constructor(private bartStationsService: BartStationsServiceService, private bService: BartStationServiceService, private spinner: NgxSpinnerService) { }
  stationName: String = "";
  stationArray = [];
  food :String = "";
  shopping :String = "";
  today: number;
  ngOnInit() {
    this.spinner.show();
    this.stationName = this.bartStationsService.getStation();
    console.log(this.stationName);
    this.bService.getBartStation(this.stationName).subscribe(data => {
      this.spinner.hide();
      this.stationArray.push(data.root.stations.station);
      //FOOD LINK
      let food = data.root.stations.station.food['#cdata-section'];
      let foodLink = [];
      let foodLink1 = [];
      let foodLink2 = [];
      foodLink = food.split("http");
      foodLink1 = foodLink[1].split("\"\"");
      foodLink2 = foodLink1[0].split(">");
      let foodlink = "http" + foodLink2[0];
      let foodurl = foodlink.split("\"");
      this.food = foodurl[0];
      //FOOD LINK
      //TRAVEL LINK
      let shopping = data.root.stations.station.shopping['#cdata-section'];
      let shoppingLink = [];
      let shoppingLink1 = [];
      let shoppingLink2 = [];
      shoppingLink = shopping.split("http");
      shoppingLink1 = shoppingLink[1].split("\"\"");
      shoppingLink2 = shoppingLink1[0].split(">");
      let shoppingLink3 = "http" + shoppingLink2[0];
      let shoppingUrl = shoppingLink3.split("\"");
      this.shopping = shoppingUrl[0];
      //TRAVEL LINK
    })
    this.today = Date.now();
    console.log(this.today);
  }

}
