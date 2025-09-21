import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { DomSanitizer } from '@angular/platform-browser';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/animations';
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
   animations: [
      trigger('fadeInOut', [
        state('void', style({ opacity: 0 })), // when element enters or leaves
        transition(':enter', [ // 👈 fade in
          animate('300ms ease-in', style({ opacity: 1 }))
        ]),
        transition(':leave', [ // 👈 fade out
          animate('500ms ease-out', style({ opacity: 0 }))
        ])
      ]),
      trigger('slideFade', [
        state('void', style({ opacity: 0, transform: 'translateY(-20px)' })), // before enter
        transition(':enter', [
          animate('700ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
        ]),
        transition(':leave', [
          animate('400ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
        ])
      ]),
      trigger('slideFadeUp', [
        state('void', style({ opacity: 0, transform: 'translateY(20px)' })), // before enter
        transition(':enter', [
          animate('700ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
        ]),
        transition(':leave', [
          animate('400ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
        ])
      ]),
    
    ]
})
export class HomepageComponent implements OnInit {
  products: Product[] = [];
  constructor(private cart: CartService, private sanitizer: DomSanitizer) { }
  safeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url); // only if URL is fully trusted
  }

  ngOnInit(): void {
    // Mock product data (replace with service later)
    this.products = [
      { id: 1, name: 'Leather Wallet', price: 999, image: 'assets/prod1.jpg' },
      { id: 2, name: 'Sneakers', price: 2999, image: 'assets/prod2.jpg' },
      { id: 3, name: 'Denim Jacket', price: 4499, image: 'assets/prod3.jpg' },
      { id: 4, name: 'Wrist Watch', price: 5499, image: 'assets/prod4.jpg' }
    ];
  }

  addToCart(product: Product) {
    this.cart.addToCart(product, 1);
    alert(`${product.name} added to cart! 🛒`);
  }
}
