import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUrl = 'http://localhost:3030';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public isLoggedIn = false;
  
  constructor(
    private http: HttpClient,
    private router: Router
    ) {
    let parseCurrentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.currentUserSubject = new BehaviorSubject<User>(parseCurrentUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  getToken(){
        return JSON.parse(localStorage.getItem('currentUser')).accessToken
  }
  login(username, password) {
        console.info('user', username);
        let userData = { "email":username, "password":password, "strategy":'local' }
        return this.http.post<any>(`${this.apiUrl}/authentication/`, userData)
            .pipe(map(user => user)).subscribe(
                  user =>{
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    this.isLoggedIn = true;
                  },
                  error => {
                    this.isLoggedIn = false;
                  }
            )
   }

   logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/authentication/login']);
   }
}
