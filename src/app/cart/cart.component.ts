import { Component, OnInit } from '@angular/core';
import { CartService,CartItem } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];

  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.cart.cart$.subscribe((data:any) => this.items = data);
    console.log(this.items)
  }

updateQty(id: number, event: Event) {
  const input = event.target as HTMLInputElement;
  const qty = parseInt(input.value, 10);
  if (!isNaN(qty) && qty > 0) {
    this.cart.updateQty(id, qty);
  }
}

  remove(id: number) {
    this.cart.removeItem(id);
  }

  clear() {
    this.cart.clearCart();
  }

  total() {
    return this.cart.getTotal();
  }
}
