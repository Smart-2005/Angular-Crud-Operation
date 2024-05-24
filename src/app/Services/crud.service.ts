import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private firestore:AngularFirestore) { }

  saveCustomer(customer:any):Promise<any>{
    return this.firestore.collection('customers').add(customer)
  }
  loadCustomers():Observable<any>{
    return this.firestore.collection('customers').snapshotChanges();
  }
  getCustomer(id:any):Observable<any>{
    return this.firestore.collection('customers').doc(id).valueChanges()
  }
  deleteCustomer(id:any):Promise<any>{
    return this.firestore.collection('customers').doc(id).delete();
  }
  updateCustomer(id:any,customer:any):Promise<any>{
    return this.firestore.collection('customers').doc(id).update(customer);
  }
}
