import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    const isUserLoggedIn = this.authService.getIsLoginValue();

    if (isUserLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/authentication/signin']);
      console.log("No se encuentra logeado")
      return false;
    }
  }
}
