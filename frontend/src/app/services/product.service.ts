
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/product';

  private productListSubject = new BehaviorSubject<any[]>([]);
  productList$ = this.productListSubject.asObservable();

  constructor(private http: HttpClient) {
    this.retrieveProductsFromStorage();
  }

  private retrieveProductsFromStorage() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      const products = JSON.parse(storedProducts);
      this.productListSubject.next(products);
    }
  }

  private updateStorage() {
    localStorage.setItem('products', JSON.stringify(this.productListSubject.value));
  }

  createProduct(productData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, productData);
  }

  addProductToLocalList(product: any) {
    const updatedList = [...this.productListSubject.value, product];
    this.productListSubject.next(updatedList);
    this.updateStorage();
  }
}
