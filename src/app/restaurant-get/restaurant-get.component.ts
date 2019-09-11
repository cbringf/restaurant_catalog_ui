import { Component, OnInit } from '@angular/core';
import Restaurant  from '../_models/Restaurant';
import { RestaurantsService} from '../restaurants.service';
import { Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
@Component({
  selector: 'app-restaurant-get',
  templateUrl: './restaurant-get.component.html',
  styles: []
})
export class RestaurantGetComponent implements OnInit {
  restaurants:any;
  constructor(
    private rs: RestaurantsService,
    private router: Router,
    ) { }
  
  needRefresh = new Subject<any>();

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
