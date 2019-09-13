import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantCatalogRoutingModule } from './restaurant-catalog-routing.module';
import { RestaurantAddComponent } from './restaurant-add/restaurant-add.component';
import { RestaurantEditComponent } from './restaurant-edit/restaurant-edit.component';
import { RestaurantGetComponent } from './restaurant-get/restaurant-get.component';
import { RestaurantsService } from './services/restaurant.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [RestaurantAddComponent, RestaurantEditComponent, RestaurantGetComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    RestaurantCatalogRoutingModule
  ],
  providers:[
    RestaurantsService
  ]
})
export class RestaurantCatalogModule { }
