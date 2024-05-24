import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductCrudService } from '../../Services/product-crud.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {


  constructor(private productCrudService:ProductCrudService,private router:Router){}

  productForm = new FormGroup({
    productName: new FormControl('',Validators.required),
    brand: new FormControl('',Validators.required),
    quantity: new FormControl('',Validators.required),
    price: new FormControl('',Validators.required)
  })
  saveProduct(){
    let product = {
      productName: this.productForm.get('productName')?.value,
      brand: this.productForm.get('brand')?.value,
      quantity: this.productForm.get('quantity')?.value,
      price: this.productForm.get('price')?.value,

    }
    this.productCrudService.createProduct(product).then(()=>{
      alert("Product Saved!");
      this.router.navigate(['/home/product-list'])
    }).catch(error=>{
      console.log(error);
    })
  }
}
