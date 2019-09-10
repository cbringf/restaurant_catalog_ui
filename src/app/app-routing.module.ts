import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantAddComponent } from './restaurant-add/restaurant-add.component';
import { RestaurantEditComponent } from './restaurant-edit/restaurant-edit.component';
import { RestaurantGetComponent } from './restaurant-get/restaurant-get.component';
import { RestaurantsMapComponent } from './restaurants-map/restaurants-map.component';
import {LoginComponent} from './login/login.component';
import { AuthGuard } from './_services/auth.guard';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: AppComponent, canActivate: [AuthGuard] },
  {
    path: 'restaurant/create',
    component: RestaurantAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: RestaurantEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'restaurants',
    component: RestaurantGetComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'restaurants/maps',
    component: RestaurantsMapComponent,
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
