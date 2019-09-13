import { Component, OnInit } from '@angular/core';
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
  constructor(
    private rs: RestaurantsService, 
    private http: HttpClient,
    private router: Router,
    ) {
      this.angForm = new FormGroup({
        RestaurantName: new FormControl('', [Validators.required]),
        RestaurantDescription: new FormControl(''),
        RestaurantPhone: new FormControl('', [Validators.required]),
        RestaurantMail: new FormControl('', [Validators.required, Validators.email]),
        RestaurantChef: new FormControl('', [Validators.required]),
        RestaurantChefPhone: new FormControl('', [Validators.required]),
        RestaurantChefMail: new FormControl('', [Validators.required, Validators.email]),
        RestaurantRating: new FormControl('')
     });
  }
  currentRate = 2.5;
  
  

  // getErrorMessage() {
  //   return this.RestaurantMail.hasError('required') ? 'You must enter a value' :
  //       this.RestaurantMail.hasError('email') ? 'Not a valid email' :
  //           '';
  // }

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

  add(form_data){
    console.info('test', form_data);
  }
  

  addRestaurant(form_data) {
    this.rs.addRestaurant(form_data.value);
    this.router.navigate(['restaurant']);
  }

  ngOnInit() {
  }


}
