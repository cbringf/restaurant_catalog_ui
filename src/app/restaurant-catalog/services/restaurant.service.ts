import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  api_url = environment.API_URL;

  constructor(private http: HttpClient) { }

  addRestaurant(restaurant_obj) {  
    this.http.post(`${this.api_url}/restaurant/`, restaurant_obj)
        .subscribe(res => console.log('Done'));
  }

  getRestaurants() {
    return this
           .http
           .get<any>(`${this.api_url}/restaurant`);
  }

  editRestaurant(id) {
    return this
            .http
            .get(`${this.api_url}/restaurant/${id}`);
  }

  updateRestaurant(restaurant_obj, id) {
    this
      .http
      .patch(`${this.api_url}/restaurant/${id}`, restaurant_obj)
      .subscribe(res => console.log('Done'));
  }

  deleteRestaurant(id): Observable<any> {
    return this.http.delete(`${this.api_url}/restaurant/${id}`);
  }
}
