import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: any[] = [];

  getOrders() {
    return this.orders;
  }

  placeOrder(order: any) {
    this.orders.push(order);
  }
}
