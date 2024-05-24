import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private firestore:AngularFirestore) { }

  getCustomerNames():Observable<any>{
    return this.firestore.collection('customers').snapshotChanges();
  }
  getProductNames():Observable<any>{
    return this.firestore.collection('products').snapshotChanges();
  }
  makeOrder(order:any):Promise<any>{
    return this.firestore.collection('orders').add(order)
  }
}
