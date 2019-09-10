import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-restaurants-map',
  templateUrl: './restaurants-map.component.html',
  styleUrls: ['./restaurants-map.component.css'],
  styles: ['agm-map { height: 300px; /* height is required */ }'],
})

export class RestaurantsMapComponent implements OnInit {

  public map: any = { lat: 23.093924, lng: -82.358610 };
  zoom: number = 8;
  constructor() { }

  ngOnInit() {
  }

  markers = [
    { latitude: 23.093924, longitude: -82.358610 },
    { latitude: 23.096944, longitude:  -82.361593 },
    { latitude: 23.102401, longitude:  -82.359984 }
  ];
    
  placeMarker(position: any) {
      const lat = position.coords.lat;
      const lng = position.coords.lng;
      
      this.markers.push({ latitude: lat, longitude: lng });
  }



}
