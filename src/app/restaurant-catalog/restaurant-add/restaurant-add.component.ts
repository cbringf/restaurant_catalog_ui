import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantsService } from '../services/restaurant.service';

@Component({
  selector: 'app-restaurant-add',
  templateUrl: './restaurant-add.component.html',
  styleUrls: ['./restaurant-add.component.css']
})

export class RestaurantAddComponent implements OnInit {

  angForm: FormGroup;
  fileData: File = null;
  uri = 'http://localhost:3030';
  lat: number;
  lng: number;
  zoom:number;
  selectedMarker;
  markers: any;
  address: string;
  private geoCoder;
 
  @ViewChild('search', {static: false}) private searchElementRef: ElementRef;

  constructor(
    private rs: RestaurantsService, 
    private http: HttpClient,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
    ) {
      this.angForm = new FormGroup({
        RestaurantName: new FormControl('', [Validators.required]),
        RestaurantDescription: new FormControl(''),
        RestaurantPhone: new FormControl('', [Validators.required]),
        RestaurantMail: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        RestaurantChef: new FormControl('', [Validators.required]),
        RestaurantChefPhone: new FormControl('', [Validators.required]),
        RestaurantChefMail: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        RestaurantRating: new FormControl(''),
        RestaurantLat: new FormControl('', Validators.required),
        RestaurantLng: new FormControl('', Validators.required),
        RestaurantAddress: new FormControl('', Validators.required),
     });
  }
  currentRate = 2.5;

  restaurant_validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ]
  }

  addMarker(lat: number, lng: number) {
    this.markers = []
    this.markers.push({lat, lng, alpha:0.4})
    this.lat = lat;
    this.lng = lng
    this.address = this.address;
  }

  fileProgress(event) {
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.angForm.patchValue({
          file: reader.result
      });
      
       
      };
     this.fileData = file
    // console.info('event', this.fileData)
    }
  }
 
  onSubmit(file) {
      const formData = new FormData();
      formData.append('uri', this.fileData, this.fileData.name);
      console.info('form data', this.fileData);
      this.http.post(`${this.uri}/file/`, formData)
        .subscribe(res => {
          console.log(res);
          alert('SUCCESS !!');
        })
  }  

  addRestaurant(form_data) {
    this.rs.addRestaurant(form_data.value);
    this.router.navigate(['restaurant']);
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
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    this.getAddress(this.lat, this.lng);
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
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    });
  }


}
