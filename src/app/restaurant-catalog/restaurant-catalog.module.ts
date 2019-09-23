import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import {MatFormFieldModule} from '@angular/material/form-field';
import { StarRatingModule } from 'angular-star-rating';
import { RestaurantCatalogRoutingModule } from './restaurant-catalog-routing.module';
import { RestaurantAddComponent } from './restaurant-add/restaurant-add.component';
import { RestaurantEditComponent } from './restaurant-edit/restaurant-edit.component';
import { RestaurantGetComponent } from './restaurant-get/restaurant-get.component';
import { RestaurantsService } from './services/restaurant.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material/material.module';
import { AgmCoreModule } from '@agm/core';
import { RestaurantMapComponent } from './restaurant-map/restaurant-map.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [RestaurantAddComponent, RestaurantEditComponent, RestaurantGetComponent, RestaurantMapComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    // NgbModule,
    StarRatingModule.forRoot(),
    RestaurantCatalogRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCSIFuXPQXel1splGkx5ElXoU1bL60Jn-I'
      /* apiKey is required, unless you are a 
      premium customer, in which case you can 
      use clientId 
      */
    })
  ],
  providers:[
    RestaurantsService
  ]
})
export class RestaurantCatalogModule { }
