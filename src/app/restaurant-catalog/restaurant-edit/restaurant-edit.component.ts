import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantsService } from '../services/restaurant.service';
@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.component.html',
  styles: []
})
export class RestaurantEditComponent implements OnInit {
  angForm: FormGroup;
  restaurant: any = {};

  constructor(private route: ActivatedRoute, private router: Router, private rs: RestaurantsService, private fb: FormBuilder) {
    this.createForm();
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
      RestaurantRating: new FormControl('')
   });
  }

  updateRestaurant(form_data, id) {
    this.route.params.subscribe(params => {
      console.info('params', params)
      this.rs.updateRestaurant(form_data.value, id);
      this.router.navigate(['restaurant']);
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.rs.editRestaurant(params['id']).subscribe(res => {
        this.restaurant = res;
      });
    });
  }



}
