import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  submitted = false;

  checkoutForm = this.fb.group({
    fullName: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    payment: ['cod', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private cart: CartService,
    private orderService: OrderService,
    private router: Router,
    private auth: AuthService
  ) {}

  get f() {
    return this.checkoutForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.checkoutForm.invalid) return;

    // ✅ Use the sync method
    if (!this.auth.isAuthenticated()) {
      alert('⚠️ Please login before placing an order.');
      this.router.navigate(['/login']);
      return;
    }

    const order = {
      customer: this.checkoutForm.value,
      items: this.cart.getItems(),
      total: this.cart.getItems().reduce(
        (sum: number, item) => sum + item.price * item.qty,
        0
      ),
      date: new Date(),
      user: this.auth.getCurrentUserEmail()
    };

    this.orderService.placeOrder(order);
    this.cart.clearCart();

    alert('✅ Order placed successfully!');
    this.router.navigate(['/orders']);
  }
}
