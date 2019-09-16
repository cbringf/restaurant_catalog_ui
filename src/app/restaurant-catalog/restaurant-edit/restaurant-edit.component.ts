import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantsService } from '../services/restaurant.service';
@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.component.html',
  styleUrls: ['./restaurant-edit.component.css']
})
export class RestaurantEditComponent implements OnInit {
  angForm: FormGroup;
  restaurant: any = {};
  lat: number;
  lng: number;
  zoom:number;
  selectedMarker;
  markers: any;
  address: string;
  private geoCoder;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private rs: RestaurantsService, 
    private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
    ) {
    this.createForm();
    this.markers = [];
  }

  createForm() {
    this.angForm = new FormGroup({
      RestaurantName: new FormControl('', [Validators.required]),
      RestaurantDescription: new FormControl(''),
      RestaurantPhone: new FormControl('', [Validators.required]),
      RestaurantMail: new FormControl('', [Validators.required, Validators.email]),
      RestaurantChef: new FormControl('', [Validators.required]),
      RestaurantChefPhone: new FormControl('', [Validators.required]),
      RestaurantChefMail: new FormControl('', [Validators.required, Validators.email]),
      RestaurantRating: new FormControl(''),
      RestaurantLat: new FormControl('', Validators.required),
      RestaurantLng: new FormControl('', Validators.required),
      RestaurantAddress: new FormControl('', Validators.required),
   });
  }

  updateRestaurant(form_data) {
    this.route.params.subscribe(params => {
      console.info('params', params)
      this.rs.updateRestaurant(form_data.value, params.id);
      this.router.navigate(['restaurant']);
    });
  }

  addMarker(lat: number, lng: number) {
    this.markers = []
    this.markers.push({lat, lng, alpha:0.4})
    this.lat = lat;
    this.lng = lng
    this.address = this.address;
  }

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    this.getAddress(this.lat, this.lng);
  }
  // Get Current Location Coordinates
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
    this.route.params.subscribe(params => {
      this.rs.editRestaurant(params['id']).subscribe(res => {
        this.restaurant = res;
        console.info(this.restaurant);
        this.markers.push({lat:this.restaurant.RestaurantLat, lng:this.restaurant.RestaurantLng, alpha:0.4})
        this.mapsAPILoader.load().then(() => {
          this.setCurrentLocation();
          this.geoCoder = new google.maps.Geocoder;
        });
      });
    });
  }



}
