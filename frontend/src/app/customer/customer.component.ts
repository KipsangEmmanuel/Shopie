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

  constructor(
    private productService: ProductService,
    private productSharedService: ProductSharedService,
    private router: Router 
  ) {
    this.productSharedService.productList$.subscribe((products) => {
      this.productList = products;
    });
  }

  ngOnInit() {
    this.productService.productList$.subscribe((products) => {
      this.productList = products;
      return products
    });
  }

  goToCart() {
    this.router.navigate(['/cart']) 
  }


}
