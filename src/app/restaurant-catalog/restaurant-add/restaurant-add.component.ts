import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantsService } from '../services/restaurant.service';
@Component({
  selector: 'app-restaurant-add',
  templateUrl: './restaurant-add.component.html',
  styles: []
})
export class RestaurantAddComponent implements OnInit {

  angForm: FormGroup;
  fileData: File = null;
  uri = 'http://localhost:3030';
  constructor(
    private fb: FormBuilder, 
    private rs: RestaurantsService, 
    private http: HttpClient,
    private router: Router,
    ) {
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
  

  addRestaurant(RestaurantName, RestaurantDescription, RestaurantPhone, RestaurantMail, RestaurantChef, RestaurantChefPhone, RestaurantChefMail, currentRate, RestaurantImage, RestaurantLatitude, RestaurantLongitude) {
    this.rs.addRestaurant(RestaurantName, RestaurantDescription, RestaurantPhone, RestaurantMail, RestaurantChef, RestaurantChefPhone, RestaurantChefMail, currentRate, RestaurantImage, RestaurantLatitude, RestaurantLongitude);
    this.router.navigate(['restaurants']);
  }

  ngOnInit() {
  }


}
