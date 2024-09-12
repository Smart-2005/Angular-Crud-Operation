import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../Services/crud.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.scss'
})
export class AddCustomerComponent{

  constructor(private crudService:CrudService,private router:Router){}

  customerForm = new FormGroup({
    fullname: new FormControl('',Validators.required),
    country: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    contact: new FormControl('',Validators.required)
  })

  createCustomer(){
    let customer={
      fullname:this.customerForm.get('fullname')?.value,
      country:this.customerForm.get('country')?.value,
      address:this.customerForm.get('address')?.value,
      contact:this.customerForm.get('contact')?.value,
    }
    this.crudService.saveCustomer(customer).then(response=>{
      alert("Customer Created!!")
      this.router.navigate(['home/customer-list'])
    }).catch(error=>{
      console.log(error);
      
    })
    
  }
}
