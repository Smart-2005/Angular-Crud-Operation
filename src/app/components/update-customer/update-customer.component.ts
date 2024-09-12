import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CrudService } from '../../Services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrl: './update-customer.component.scss'
})
export class UpdateCustomerComponent implements OnInit {

  customerForm = new FormGroup({
    fullname: new FormControl('',Validators.required),
    country: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    contact: new FormControl('',Validators.required)
  })

  constructor(private crudService:CrudService,private activatedRoute:ActivatedRoute,private router:Router){}

  customerId:any
  customer:any
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      this.customerId = params.get('id');

      this.crudService.getCustomer(this.customerId).subscribe(customerData=>{
          this.customer = customerData;
          this.customerForm.patchValue({
            fullname:this.customer.fullname,
            country:this.customer.country,
            address:this.customer.address,
            contact:this.customer.contact
          });
      })
    })
  }
  updateDetails(){
    let customer={
      fullname:this.customerForm.get('fullname')?.value,
      country:this.customerForm.get('country')?.value,
      address:this.customerForm.get('address')?.value,
      contact:this.customerForm.get('contact')?.value,
    }
    this.crudService.updateCustomer(this.customerId,customer).then(response=>{
      this.router.navigate(['home/customer-list'])
      alert("Customer Updated!!")
    }).catch(error=>{
      console.log(error);
      
    })
    
  }


}
