import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  qty: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartKey = 'cartItems';
  private items: CartItem[] = [];
  private items$ = new BehaviorSubject<CartItem[]>([]);

  cart$ = this.items$.asObservable();

  constructor() {
    // Load saved cart from localStorage
    const saved = localStorage.getItem(this.cartKey);
    this.items = saved ? JSON.parse(saved) : [];
    this.emit();
  }
  getItems(): CartItem[] {
    return this.items;
  }
  addToCart(product: any, qty: number = 1) {
    const found = this.items.find(item => item.id === product.id);
    if (found) {
      found.qty += qty;
    } else {
      this.items.push({ ...product, qty });
    }
    this.save();
  }

  updateQty(id: number, qty: number) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.qty = qty;
      if (item.qty <= 0) {
        this.removeItem(id);
      } else {
        this.save();
      }
    }
  }

  removeItem(id: number) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
  }

  clearCart() {
    this.items = [];
    this.save();
  }

  getTotal(): number {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  private save() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.items));
    this.emit();
  }

  private emit() {
    this.items$.next([...this.items]);
  }
}
