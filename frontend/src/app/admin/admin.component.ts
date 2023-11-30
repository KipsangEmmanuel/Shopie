import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../interfaces/product';
import { ProductSharedService } from '../services/product-shared.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  productForm: FormGroup;
  UpdateproductForm!: FormGroup;
  productList: Product[] = [];
  hide = true;
  hiden=true
  filter= ''
  product_id!: Product
  // product!: Product
  isUpdateMode: boolean = false;
  selectedProductId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private productSharedService: ProductSharedService
  ) {
    this.productForm = this.fb.group({
      product_name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
    });

    this.UpdateproductForm=this.fb.group({
      product_name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.getAllProducts()
  
}



updateProduct(product_id:string){
  console.log(product_id);
  
  let updatedProduct=this.UpdateproductForm.value
}

  clicked() {
    console.log('clicked');

    this.hide = !this.hide;
  }
  createProduct() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;

      this.productService.createProduct(productData).subscribe(
        (response) => {
          console.log('Product created successfully', response);
          this.productService.addProductToLocalList(productData);
          this.productForm.reset();

          this.productSharedService.updateProductList(this.productList);
        },
        (error) => {
          console.error('Error creating product', error);
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }

  deleteProduct(product_id:string) {
    console.log('Deleting product with ID:', product_id);
  
    const confirmDelete = confirm('Are you sure you want to delete this product?');
    
    if (confirmDelete) {
      this.productService.deleteProduct(product_id).subscribe(
        () => {
          console.log('Product deleted successfully');
          this.productService.removeProductFromLocalList(product_id);
          this.productSharedService.updateProductList(this.productList);
          this.getAllProducts()
        },
        (error) => {
          console.error('Error deleting product', error);
        }
      );
    }
  }



getAllProducts(){
  this.productService.getAllProducts().then((res) => {
    console.log(res)
   const products = res.products
    this.productList=products;
  })
}
}

