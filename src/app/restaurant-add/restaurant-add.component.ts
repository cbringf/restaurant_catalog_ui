import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { RestaurantsService} from '../restaurants.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-restaurant-add',
  templateUrl: './restaurant-add.component.html',
  styles: []
})
export class RestaurantAddComponent implements OnInit {

  angForm: FormGroup;
  fileData: File = null;
  uri = 'http://localhost:3030';
  constructor(private fb: FormBuilder, private rs: RestaurantsService, private http: HttpClient) {
    this.createForm();
  }
  currentRate = 8;

  createForm() {
    this.angForm = this.fb.group({
      RestaurantName: ['', Validators.required ],
      RestaurantDescription: ['', Validators.required ],
      RestaurantContact: ['', Validators.required ],
      RestaurantPhone: ['', Validators.required ],
      RestaurantMail: ['', Validators.required ],
      RestaurantChef: ['', Validators.required ],
      RestaurantChefPhone: ['', Validators.required ],
      RestaurantChefMail: ['', Validators.required ],
      RestaurantImage:['', Validators.required ],
      RestaurantLatitude:['', Validators.required ],
      RestaurantLongitude:['', Validators.required ]
    });
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
      
        // need to run CD since file load runs outside of zone
       
      };
      
      console.info('*******', file)
     this.fileData = file
    // console.info('event', this.fileData)
    }
  }
 
  onSubmit(file) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    httpOptions.headers =
    httpOptions.headers.set('Authorization', 'Bearer '+"eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOiJUNDhtMVdGbkNMODVFemh0IiwiaWF0IjoxNTY3NzE1NDg1LCJleHAiOjE1Njc4MDE4ODUsImF1ZCI6Imh0dHBzOi8veW91cmRvbWFpbi5jb20iLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6ImFub255bW91cyIsImp0aSI6IjlhNjBiNGE3LTQxZjgtNGM0Zi04ZDg0LWZkNGQxN2NjNjNhNCJ9.zF5mldH2k_kaTK_1-exr2OQGPcoJDvFxleisDBwoZCs");
      const formData = new FormData();
      formData.append('uri', this.fileData, this.fileData.name);
      console.info('form data', this.fileData);
      this.http.post(`${this.uri}/file/`, formData, httpOptions)
        .subscribe(res => {
          console.log(res);
          alert('SUCCESS !!');
        })
  }
  

  addRestaurant(RestaurantName, RestaurantDescription, RestaurantPhone, RestaurantMail, RestaurantChef, RestaurantChefPhone, RestaurantChefMail, currentRate, RestaurantImage, RestaurantLatitude, RestaurantLongitude) {
    this.rs.addRestaurant(RestaurantName, RestaurantDescription, RestaurantPhone, RestaurantMail, RestaurantChef, RestaurantChefPhone, RestaurantChefMail, currentRate, RestaurantImage, RestaurantLatitude, RestaurantLongitude);
  }

  ngOnInit() {
  }


}
