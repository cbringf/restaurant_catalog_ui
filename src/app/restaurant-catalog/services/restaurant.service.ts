import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  uri = 'http://localhost:3030';

  constructor(private http: HttpClient) { }

  addRestaurant(RestaurantName, RestaurantDescription, RestaurantPhone, RestaurantMail, RestaurantChef, RestaurantChefPhone, RestaurantChefMail, RestaurantRating, RestaurantImage, RestaurantLatitude, RestaurantLongitude) {
    const obj = {
      RestaurantName,
      RestaurantDescription,
      RestaurantPhone,
      RestaurantMail,
      RestaurantChef,
      RestaurantChefPhone,
      RestaurantChefMail,
      RestaurantRating,
      RestaurantImage,
      RestaurantLatitude,
      RestaurantLongitude

    };
    this.http.post(`${this.uri}/restaurant/`, obj)
        .subscribe(res => console.log('Done'));
  }

  getRestaurants() {
    return this
           .http
           .get<any>(`${this.uri}/restaurant`);
  }

  editRestaurant(id) {
    return this
            .http
            .get(`${this.uri}/restaurant/${id}`);
  }

  updateRestaurant(RestaurantName, RestaurantDescription, RestaurantPhone, RestaurantMail, RestaurantChef, RestaurantChefPhone, RestaurantChefMail, RestaurantRating, id) {
    const obj = {
      RestaurantName, 
      RestaurantDescription, 
      RestaurantPhone, 
      RestaurantMail, 
      RestaurantChef, 
      RestaurantChefPhone, 
      RestaurantChefMail, 
      RestaurantRating
    };
    
    this
      .http
      .patch(`${this.uri}/restaurant/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

  deleteRestaurant(id): Observable<any> {
    console.info('id a borrar', id)
    return this.http.delete(`${this.uri}/restaurant/${id}`);
  }
}
