import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantAddComponent } from './restaurant-add/restaurant-add.component';
import { RestaurantEditComponent } from './restaurant-edit/restaurant-edit.component';
import { RestaurantGetComponent } from './restaurant-get/restaurant-get.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RestaurantsService } from './restaurants.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SliderModule } from 'angular-image-slider';
import { RestaurantsMapComponent } from './restaurants-map/restaurants-map.component';
import { AgmCoreModule } from '@agm/core'


@NgModule({
  declarations: [
    AppComponent,
    RestaurantAddComponent,
    RestaurantEditComponent,
    RestaurantGetComponent,
    RestaurantsMapComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    HttpClientModule,
    NgbModule,
    SliderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAQuN3NtOS0UbQpRNVtjtbr5d4jccsPjyU'
      /* apiKey is required, unless you are a 
      premium customer, in which case you can 
      use clientId 
      */
    })
  ],
  providers: [
    RestaurantsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
