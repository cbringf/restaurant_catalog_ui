import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantsService } from '../services/restaurant.service';
import { PhoneValidator } from '../validators/phone.validator';
import { Country } from '../models/country.model';

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
  currentRate = 2.5;
  country_phone_group: FormGroup;
  
  countries = [
    new Country('CU', 'Cuba')
  ];
  @ViewChild('search', {static: false}) private searchElementRef: ElementRef;

  constructor(
    private rs: RestaurantsService, 
    private http: HttpClient,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
    ) {
      let country = new FormControl(this.countries[0], Validators.required);

      let phone = new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          PhoneValidator.validCountryPhone(country)
        ])
      });

      this.country_phone_group = new FormGroup({
        country: country,
        phone: phone
      });
      this.angForm = new FormGroup({
        country: new FormControl(this.countries[0], Validators.required),
        // phone: new FormControl('', {
        //   validators: Validators.compose([
        //     Validators.required,
        //     PhoneValidator.validCountryPhone(country)
        //   ])
        // }),
        RestaurantName: new FormControl('', [Validators.required]),
        RestaurantDescription: new FormControl(''),
        RestaurantPhone: new FormControl('', {
          validators: Validators.compose([
            Validators.required,
            PhoneValidator.validCountryPhone(country)
          ])
        }),
        RestaurantMail: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        RestaurantChef: new FormControl('', [Validators.required]),
        RestaurantChefPhone: new FormControl('', {
          validators: Validators.compose([
            Validators.required,
            PhoneValidator.validCountryPhone(country)
          ])
        }),
        RestaurantChefMail: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        RestaurantRating: new FormControl(''),
        RestaurantLat: new FormControl('', Validators.required),
        RestaurantLng: new FormControl('', Validators.required),
        RestaurantAddress: new FormControl('', ),
        country_phone: this.country_phone_group
      })
  }
  
  validation_messages = {
    'fullname': [
      { type: 'required', message: 'Full name is required' }
    ],
    'bio': [
      { type: 'maxlength', message: 'Bio cannot be more than 256 characters long' },
    ],
    'gender': [
      { type: 'required', message: 'Please select your gender' },
    ],
    'birthday': [
      { type: 'required', message: 'Please insert your birthday' },
    ],
    'phone': [
      { type: 'required', message: 'Phone is required' },
      { type: 'validCountryPhone', message: 'Phone incorrect for the country selected' }
    ]
  };

  restaurant_validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ]
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
