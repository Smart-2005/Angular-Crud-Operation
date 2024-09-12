import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../Services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrl: './make-order.component.scss'
})
export class MakeOrderComponent implements OnInit {

  constructor(private orderService:OrderService,private router:Router){}

  orderForm = new FormGroup({
    customerName: new FormControl('',Validators.required),
    productName: new FormControl('',Validators.required),
    quantity: new FormControl('',Validators.required),
    price: new FormControl('',Validators.required)
  })

  customerNameList:any[]=[];
  productNameList:any[]=[];
  ngOnInit(): void {

    //Load Customer Name
    this.orderService.getCustomerNames().subscribe((data)=>{
      this.customerNameList = data.map((e:any)=>{
        return{
          id:e.payload.doc.id,
          ...e.payload.doc.data()
        }
      })
    })

    //Load Product Name
    this.orderService.getProductNames().subscribe((data)=>{
      this.productNameList = data.map((e:any)=>{
        return{
          id:e.payload.doc.id,
          ...e.payload.doc.data()
        }
      })
    })

    this.orderForm.get('productName')?.valueChanges.subscribe((productName) => {
      if (productName) {
        // Fetch price based on selected product name
        const selectedProduct = this.productNameList.find(product => product.productName === productName);
        if (selectedProduct) {
          this.orderForm.patchValue({
            price: selectedProduct.price // Assuming there's a 'price' property in your product data
          });
        }
      }
    });
        // Listen to changes in product name and quantity
        this.orderForm.get('productName')?.valueChanges.subscribe((productName) => {
          this.calculatePrice();
        });
    
        this.orderForm.get('quantity')?.valueChanges.subscribe(() => {
          this.calculatePrice();
        });
      }
    
      calculatePrice() {
        const productName:any= this.orderForm.get('productName')?.value;
        const quantity:any = this.orderForm.get('quantity')?.value;
        
        if (productName && quantity) {
          const selectedProduct = this.productNameList.find(product => product.productName === productName);
          if (selectedProduct) {
            const price = selectedProduct.price; // Assuming there's a 'price' property in your product data
            const totalPrice :any = price * quantity;
            this.orderForm.patchValue({
              price: totalPrice
            });
          }
        }
      }

  saveOrder(){
    let order={
      customerName: this.orderForm.get('customerName')?.value,
      productName: this.orderForm.get('productName')?.value,
      quantity: this.orderForm.get('quantity')?.value,
      price: this.orderForm.get('price')?.value,
    }
    this.orderService.makeOrder(order).then(()=>{
      alert("Order Placed!")
      this.router.navigate(['/home'])
    }).catch(error=>{
      console.log(error);
      
    })
    
  }
}
