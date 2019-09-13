import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication/services/auth.service';
import { User } from './authentication/models/user';
import { NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;
  title = 'restaurant';
  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
    this.router.events.subscribe((event: Event) => {
      
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/authentication/login']);
  }
}
