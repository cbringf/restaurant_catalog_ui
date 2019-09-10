import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantsService } from '../restaurants.service';
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
    this.angForm = this.fb.group({
      RestaurantName: ['', Validators.required ],
      RestaurantDescription: ['', Validators.required ],
      RestaurantContact: ['', Validators.required ],
      RestaurantPhone: ['', Validators.required ],
      RestaurantMail: ['', Validators.required ],
      RestaurantChef: ['', Validators.required ],
      RestaurantChefPhone: ['', Validators.required ],
      RestaurantChefMail: ['', Validators.required ]
    });
  }

  updateRestaurant(RestaurantName, RestaurantDescription, RestaurantPhone, RestaurantMail, RestaurantChef, RestaurantChefPhone, RestaurantChefMail, RestaurantRating, id) {
    this.route.params.subscribe(params => {
      this.rs.updateRestaurant(RestaurantName, RestaurantDescription, RestaurantPhone, RestaurantMail, RestaurantChef, RestaurantChefPhone, RestaurantChefMail, RestaurantRating, params.id);
      this.router.navigate(['restaurants']);
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.rs.editRestaurant(params['id']).subscribe(res => {
        this.restaurant = res;
        console.info('res', res);
      });
    });
  }



}
