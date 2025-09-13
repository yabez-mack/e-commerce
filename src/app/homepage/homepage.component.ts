import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { DomSanitizer } from '@angular/platform-browser';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
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
