import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CartService } from './services/cart.service';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class CheckoutGuard implements CanActivate {
  constructor(private auth: AuthService, private cart: CartService, private router: Router) {}

  canActivate(): boolean {
    const loggedIn = this.auth.isLoggedInSync();
    const hasItems = this.cart.getItems().length > 0;

    if (!loggedIn) {
      alert('⚠️ Please login before proceeding to checkout.');
      this.router.navigate(['/login']);
      return false;
    }

    if (!hasItems) {
      alert('⚠️ Your cart is empty. Add items before checkout.');
      this.router.navigate(['/cart']);
      return false;
    }

    return true;
  }
}
