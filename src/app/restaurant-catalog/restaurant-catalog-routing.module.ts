import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantEditComponent } from './restaurant-edit/restaurant-edit.component';
import { RestaurantGetComponent } from './restaurant-get/restaurant-get.component';
import { AuthGuard } from '../core/services/guards/auth.guard';
import { RestaurantAddComponent } from './restaurant-add/restaurant-add.component';


const routes: Routes = [
  {
    path: '',
    component: RestaurantGetComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: RestaurantAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: RestaurantEditComponent,
    canActivate: [AuthGuard]
  },
  
  // {
  //   path: 'restaurants/maps',
  //   component: RestaurantsMapComponent,
  //   canActivate: [AuthGuard]
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantCatalogRoutingModule { }
