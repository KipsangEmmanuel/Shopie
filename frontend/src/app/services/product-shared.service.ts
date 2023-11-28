// shared/product-shared.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductSharedService {
  private productListSource = new BehaviorSubject<any[]>([]);
  productList$ = this.productListSource.asObservable();

  updateProductList(products: any[]) {
    this.productListSource.next(products);
  }
}
