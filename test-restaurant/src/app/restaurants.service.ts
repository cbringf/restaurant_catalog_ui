import { Injectable } from '@angular/core';
import { HttpHeaders ,HttpClient } from '@angular/common/http';

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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    httpOptions.headers =
    httpOptions.headers.set('Authorization', 'Bearer '+"eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOiJUNDhtMVdGbkNMODVFemh0IiwiaWF0IjoxNTY3NzE1NDg1LCJleHAiOjE1Njc4MDE4ODUsImF1ZCI6Imh0dHBzOi8veW91cmRvbWFpbi5jb20iLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6ImFub255bW91cyIsImp0aSI6IjlhNjBiNGE3LTQxZjgtNGM0Zi04ZDg0LWZkNGQxN2NjNjNhNCJ9.zF5mldH2k_kaTK_1-exr2OQGPcoJDvFxleisDBwoZCs");
    console.log(obj);
    this.http.post(`${this.uri}/restaurant/`, obj, httpOptions)
        .subscribe(res => console.log('Done'));
  }

  getRestaurants() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    httpOptions.headers =
    httpOptions.headers.set('Authorization', 'Bearer '+"eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOiJUNDhtMVdGbkNMODVFemh0IiwiaWF0IjoxNTY3NzE1NDg1LCJleHAiOjE1Njc4MDE4ODUsImF1ZCI6Imh0dHBzOi8veW91cmRvbWFpbi5jb20iLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6ImFub255bW91cyIsImp0aSI6IjlhNjBiNGE3LTQxZjgtNGM0Zi04ZDg0LWZkNGQxN2NjNjNhNCJ9.zF5mldH2k_kaTK_1-exr2OQGPcoJDvFxleisDBwoZCs");
    return this
           .http
           .get(`${this.uri}/restaurant`, httpOptions);
  }

  editRestaurant(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    httpOptions.headers =
    httpOptions.headers.set('Authorization', 'Bearer '+"eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOiJUNDhtMVdGbkNMODVFemh0IiwiaWF0IjoxNTY3NzE1NDg1LCJleHAiOjE1Njc4MDE4ODUsImF1ZCI6Imh0dHBzOi8veW91cmRvbWFpbi5jb20iLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6ImFub255bW91cyIsImp0aSI6IjlhNjBiNGE3LTQxZjgtNGM0Zi04ZDg0LWZkNGQxN2NjNjNhNCJ9.zF5mldH2k_kaTK_1-exr2OQGPcoJDvFxleisDBwoZCs");
    return this
            .http
            .get(`${this.uri}/restaurant/${id}`, httpOptions);
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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    httpOptions.headers =
    httpOptions.headers.set('Authorization', 'Bearer '+"eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOiJUNDhtMVdGbkNMODVFemh0IiwiaWF0IjoxNTY3NzE1NDg1LCJleHAiOjE1Njc4MDE4ODUsImF1ZCI6Imh0dHBzOi8veW91cmRvbWFpbi5jb20iLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6ImFub255bW91cyIsImp0aSI6IjlhNjBiNGE3LTQxZjgtNGM0Zi04ZDg0LWZkNGQxN2NjNjNhNCJ9.zF5mldH2k_kaTK_1-exr2OQGPcoJDvFxleisDBwoZCs");
    this
      .http
      .patch(`${this.uri}/restaurant/${id}`, obj, httpOptions)
      .subscribe(res => console.log('Done'));
  }

  deleteRestaurant(id) {
    console.info('id a borrar', id)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    httpOptions.headers =
    httpOptions.headers.set('Authorization', 'Bearer '+"eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOiJUNDhtMVdGbkNMODVFemh0IiwiaWF0IjoxNTY3NzE1NDg1LCJleHAiOjE1Njc4MDE4ODUsImF1ZCI6Imh0dHBzOi8veW91cmRvbWFpbi5jb20iLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6ImFub255bW91cyIsImp0aSI6IjlhNjBiNGE3LTQxZjgtNGM0Zi04ZDg0LWZkNGQxN2NjNjNhNCJ9.zF5mldH2k_kaTK_1-exr2OQGPcoJDvFxleisDBwoZCs");
    return this.http.delete(`${this.uri}/restaurant/${id}`, httpOptions);
  }
}
