import { Component, HostListener, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cartCount = 0;
  loggedIn = false;
  menuOpen = false;
  isMobile = false;

  constructor(private cart: CartService, private auth: AuthService, private router: Router) {}

 
  ngOnInit() {
    // Subscribe to cart 
    this.checkScreenSize();
    // updates
    this.cart.cart$.subscribe(items => {
      this.cartCount = items.reduce((sum, item) => sum + item.qty, 0);
    });

    // Subscribe to auth state
    this.auth.isLoggedIn.subscribe(state => {
      this.loggedIn = state;
    });

    // ✅ Initialize loggedIn state immediately
    this.loggedIn = this.auth.isAuthenticated();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768; // Tailwind's md breakpoint
    if (!this.isMobile) {
      this.menuOpen = true; // Always open on desktop
    } else {
      this.menuOpen = false; // Closed by default on mobile
    }
  }

  toggleMenu() {
    if (this.isMobile) {
      this.menuOpen = !this.menuOpen;
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
