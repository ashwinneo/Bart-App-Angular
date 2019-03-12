import { Component, OnInit, Input } from '@angular/core';

import { MouseEvent } from '@agm/core';
@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {

  constructor() { }
  @Input("mapArray") mapArray;
  origin: any;
  destination: any;
  travelMode: String;
  mapTypeId: String;
  ngOnInit() {
    console.log(this.mapArray);
    this.origin = this.mapArray[0];
    this.destination = this.mapArray[1];
    this.travelMode = "TRANSIT";
  }
  lat: number = 37.752470;
  lng: number = -122.418143;
  zoom: number = 8;
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  
  markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
		  draggable: true
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'B',
		  draggable: false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C',
		  draggable: true
	  }
  ]

}
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
