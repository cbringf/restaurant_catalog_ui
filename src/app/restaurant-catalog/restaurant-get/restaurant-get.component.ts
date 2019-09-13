import { Component, OnInit } from '@angular/core';
import Restaurant  from '../models/restaurant';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { RestaurantsService } from '../services/restaurant.service';
@Component({
  selector: 'app-restaurant-get',
  templateUrl: './restaurant-get.component.html',
  styles: []
})
export class RestaurantGetComponent implements OnInit {
  restaurants: any;
  constructor(
    private rs: RestaurantsService,
    private router: Router,
    ) { }
  
  needRefresh: Subject<any> = new Subject<any>();

  deleteRestaurant(id) {
    this.rs.deleteRestaurant(id).subscribe(res => {
      this.needRefresh.next();
    });
  }

  ngOnInit() {
    this.needRefresh.pipe(
      switchMap(() => this.rs.getRestaurants()),
      map(res => res.data)
    ).subscribe(res => {
      this.restaurants = res;
    });
    this.needRefresh.next();
  }

}

