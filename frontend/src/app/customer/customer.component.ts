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
filter=''
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

    const storedCart = localStorage.getItem('cart');
    this.cart = storedCart ? JSON.parse(storedCart) : [];
  }

  addToCart(product: any) {
    
        this.cart.push(product);

        this.productList = this.productList.filter((p) => p !== product);
    
        this.productSharedService.updateProductList([...this.productList]);

        localStorage.setItem('cart', JSON.stringify(this.cart));

  }

  removeFromCart(product: any) {
    this.cart = this.cart.filter((p) => p !== product);

    this.productList.push(product);

    this.productSharedService.updateProductList([...this.productList]);

    localStorage.setItem('cart', JSON.stringify(this.cart));

  }
}
