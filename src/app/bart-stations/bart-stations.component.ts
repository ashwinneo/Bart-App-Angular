import { Component, OnInit } from '@angular/core';
import { BartStationsServiceService } from './bart-stations-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-bart-stations',
  templateUrl: './bart-stations.component.html',
  styleUrls: ['./bart-stations.component.css']
})
export class BartStationsComponent implements OnInit {

  constructor(private bartService: BartStationsServiceService, private router: Router, private spinner: NgxSpinnerService) { }
  bartStations = [];
  ngOnInit() {
    this.spinner.show();
    this.bartService.getBartStations().subscribe(data => {
      this.spinner.hide();
      console.log(data);
      this.bartStations = data.root.stations.station;
      console.log("ashwin" , this.bartStations);
    })
  }

  getStation(id) {
    this.bartService.setStation(id);
    this.router.navigate(['/station']);
  }

}
