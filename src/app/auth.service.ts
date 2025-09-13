import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn$ = new BehaviorSubject<boolean>(false);
  private userEmail$ = new BehaviorSubject<string | null>(null);

  // Expose as observables for components to subscribe
  isLoggedIn = this.loggedIn$.asObservable();
  userEmail = this.userEmail$.asObservable();

  constructor() {
    this.loadAuthState();
  }

  login(email: string, password: string): boolean {
    // ⚡ Mock login check (accept any email + password for now)
    if (email && password) {
      this.loggedIn$.next(true);
      this.userEmail$.next(email);

      // Save to localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);

      // ✅ Mock token (replace later with real backend JWT)
      localStorage.setItem('token', 'demo-access-token');

      return true;
    }
    return false;
  }

  logout() {
    this.loggedIn$.next(false);
    this.userEmail$.next(null);

    // Clear from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
  }

  private loadAuthState() {
    const state = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem('userEmail');

    this.loggedIn$.next(state);
    this.userEmail$.next(email);
  }

  // ✅ Synchronous getters for guards / services
  isAuthenticated(): boolean {
    return this.loggedIn$.getValue();
  }

  getCurrentUserEmail(): string | null {
    return this.userEmail$.getValue();
  }

  isLoggedInSync(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  // ✅ Added: allow interceptor to fetch the token
  getAccessToken(): string | null {
    return localStorage.getItem('token');
  }
}
