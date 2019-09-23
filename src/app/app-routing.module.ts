import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/services/guards/auth.guard';


const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then(mod => mod.AuthenticationModule)
  },
  {
    path: 'restaurant',
    loadChildren: () => import('./restaurant-catalog/restaurant-catalog.module').then(mod => mod.RestaurantCatalogModule),
    canActivate: [AuthGuard]
  }
  // {
  //   path: '',
  //   redirectTo: '',
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
