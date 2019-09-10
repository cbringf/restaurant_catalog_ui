import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantAddComponent } from './restaurant-add/restaurant-add.component';
import { RestaurantEditComponent } from './restaurant-edit/restaurant-edit.component';
import { RestaurantGetComponent } from './restaurant-get/restaurant-get.component';
import { RestaurantsMapComponent } from './restaurants-map/restaurants-map.component';
const routes: Routes = [
  {
    path: 'restaurant/create',
    component: RestaurantAddComponent
  },
  {
    path: 'edit/:id',
    component: RestaurantEditComponent
  },
  {
    path: 'restaurants',
    component: RestaurantGetComponent
  },
  {
    path: 'restaurants/maps',
    component: RestaurantsMapComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
