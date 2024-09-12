import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCrudService {

  constructor(private firestore:AngularFirestore) { }

  createProduct(product:any):Promise<any>{
    return this.firestore.collection('products').add(product);
  }
  getAllProducts():Observable<any>{
    return this.firestore.collection('products').snapshotChanges();
  }
  getProduct(id:any):Observable<any>{
    return this.firestore.collection('products').doc(id).valueChanges();
  }
  deleteProduct(id:any):Promise<any>{
    return this.firestore.collection('products').doc(id).delete();
  }
  updateProduct(id:any,product:any):Promise<any>{
    return this.firestore.collection('products').doc(id).update(product);
  }
}
