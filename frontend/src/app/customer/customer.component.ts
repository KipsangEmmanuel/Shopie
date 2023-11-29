import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductSharedService } from '../services/product-shared.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent {
  productList: any[] = [];
  cart: any[] = [];

  constructor(
    private productService: ProductService,
    private productSharedService: ProductSharedService,
    private router: Router,
  ) {
    this.productSharedService.productList$.subscribe((products) => {
      this.productList = products;
    });
  }

  ngOnInit() {
    this.productService.productList$.subscribe((products) => {
      this.productList = products;
    });
  }

  addToCart(product: any) {
    // Add the selected product to the cart array
    this.cart.push(product);

    // You can update any logic related to the cart here
    // For example, you might want to update a service that manages the cart state
    // Or you can emit an event to notify other components about the cart update
  }
}
