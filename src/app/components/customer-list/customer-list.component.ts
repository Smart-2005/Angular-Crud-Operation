import { CrudService } from './../../Services/crud.service';
import { Component, OnInit } from '@angular/core';
import { error, log } from 'console';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {

  customerForm = new FormGroup({
    fullname: new FormControl('',Validators.required),
    country: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    contact: new FormControl('',Validators.required)
  })
  
  constructor(private crudService:CrudService){}

  customerList:any[]=[];

  ngOnInit(): void {
    this.crudService.loadCustomers().subscribe((data)=>{
      this.customerList = data.map((e:any)=>{
        return{

          id:e.payload.doc.id,
          ...e.payload.doc.data()
        }
      })
    })
    
  }
  deleteDetails(id:any){

    if(confirm("Are you sure?")){
      this.crudService.deleteCustomer(id).then(()=>{
        console.log(id);
      }).catch(error=>{
        console.log(error);
      })
    }
    
    
  }

}
