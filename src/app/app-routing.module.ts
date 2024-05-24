import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { MakeOrderComponent } from './components/make-order/make-order.component';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { MainPageComponent } from './components/main-page/main-page.component';

const routes: Routes = [
  {path:'',redirectTo:'/home/main-page',pathMatch:'full'},
  {path:'home',component:HomeComponent,children:[
    {path:'main-page', component:MainPageComponent},
    {path:'add-customer', component:AddCustomerComponent},
    {path:'customer-list', component:CustomerListComponent},
    {path:'update-customer/:id', component:UpdateCustomerComponent},
    {path:'add-product', component:AddProductComponent},
    {path:'product-list', component:ProductListComponent},
    {path:'update-product/:id', component:UpdateProductComponent},
    {path:'make-order', component:MakeOrderComponent},
  ]},
  {path:'**',component:NotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
