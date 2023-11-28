import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  productForm: FormGroup;
  productList: any[] = [];

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      product_name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      image: ['', Validators.required]
    });
  }

  createProduct() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;

      this.productService.createProduct(productData).subscribe(
        (response) => {
          console.log('Product created successfully', response);
          this.productList.push(productData);
          this.productForm.reset();
        },
        (error) => {
          console.error('Error creating product', error);
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }
}
