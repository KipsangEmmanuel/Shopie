
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/product';

  deleteProduct(product_id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${product_id}`);
  }

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


  async getAllProducts(): Promise<any> {
    const response = await fetch('http://localhost:8000/product/all', {
      method: 'GET'
    });

    return await response.json();
  }

  private updateStorage() {
    localStorage.setItem('products', JSON.stringify(this.productListSubject.value));
  }

  removeProductFromLocalList(productId: string) {
    const updatedList = this.productListSubject.value.filter(product => product.productId !== productId);
    this.productListSubject.next(updatedList);
    this.updateStorage();
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
