import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../services/restaurant.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-restaurant-map',
  templateUrl: './restaurant-map.component.html',
  styleUrls: ['./restaurant-map.component.scss']
})
export class RestaurantMapComponent implements OnInit {
  markers = [];
  lat: number;
  lng: number;
  zoom:number;
  selectedMarker;
  address: string;
  private geoCoder;
  constructor(
    private rs: RestaurantsService,
    private http: HttpClient,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
  ) { }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.lat, this.lng);
      });
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 10;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });
  }

  ngOnInit() {

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    });
    this.rs.getRestaurants().pipe(map(res => res)).subscribe(res => {
      console.info('res',res)
      res.data.forEach(element => {
        this.markers.push({lat:element.RestaurantLat, lng:element.RestaurantLng, alpha: 0.4})
      });
      console.info('********',this.markers)
    });
    
  }
  

}
