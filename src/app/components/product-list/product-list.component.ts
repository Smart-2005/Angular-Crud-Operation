import { Component, OnInit } from '@angular/core';
import { ProductCrudService } from '../../Services/product-crud.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  constructor(private productCrudService:ProductCrudService){}
  productList:any[]=[];

  ngOnInit(): void {

    this.productCrudService.getAllProducts().subscribe((data)=>{
      this.productList = data.map((e:any)=>{
        return{
            id:e.payload.doc.id,
            ...e.payload.doc.data()
        }
      })
    })
  }
  deleteDetails(id:any){
    if(confirm("Are you Sure")){
      
      this.productCrudService.deleteProduct(id).then(()=>{
        console.log("Product Deleted!");
        
      })
    }
  }

}
