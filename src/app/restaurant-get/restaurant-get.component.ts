import { Component, OnInit } from '@angular/core';
import Restaurant  from '../_models/Restaurant';
import { RestaurantsService} from '../restaurants.service';
@Component({
  selector: 'app-restaurant-get',
  templateUrl: './restaurant-get.component.html',
  styles: []
})
export class RestaurantGetComponent implements OnInit {
  restaurants: Restaurant[];
  constructor(private rs: RestaurantsService) { }

  deleteRestaurant(id) {
    this.rs.deleteRestaurant(id).subscribe(res => {
      this.restaurants.splice(id, 1);
    });
  }

  ngOnInit() {
    this.rs
      .getRestaurants()
      .subscribe((data: Restaurant[]) => {
        this.restaurants = data.data;
    });
  }

}
