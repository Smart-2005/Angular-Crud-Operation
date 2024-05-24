import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductCrudService } from '../../Services/product-crud.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit {

  constructor(private productCrudService:ProductCrudService,private activatedRoute:ActivatedRoute,private router:Router){}

  productForm = new FormGroup({
    productName: new FormControl('',Validators.required),
    brand: new FormControl('',Validators.required),
    quantity: new FormControl('',Validators.required),
    price: new FormControl('',Validators.required)
  })

  productId:any;
  product:any
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(response=>{
      this.productId = response.get('id');
      this.productCrudService.getProduct(this.productId).subscribe(productData=>{
        this.product = productData;
        this.productForm.patchValue({
          productName: this.product.productName,
          brand: this.product.brand,
          quantity: this.product.quantity,
          price: this.product.price,
        })
      })
    })
  }
  updateDetails(){
    let product ={
      productName:this.productForm.get('productName')?.value,
      brand:this.productForm.get('brand')?.value,
      quantity:this.productForm.get('quantity')?.value,
      price:this.productForm.get('price')?.value,
    }
    this.productCrudService.updateProduct(this.productId,product).then(()=>{
      alert("Document Updated");
      this.router.navigate(['/home/product-list'])
    }).catch(error=>{
      console.log(error);
      
    })
  }

}
