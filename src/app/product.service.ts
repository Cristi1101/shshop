import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
//import { Observable } from 'rxjs';
import { Product } from './models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //caca$: Product;
  constructor(private db: AngularFireDatabase) { }
  
  //books: Observable<any[]>;
  create(product){
    return this.db.list('/products').push(product);
  } 

  // order(){
  //   let documentToDomainObject$ = this.db.list<Product>('/products')
  //   .snapshotChanges()
  //   .pipe(
  //       map(changes =>
  //           changes.map(c => {
  //               const data = c.payload.val() as Product;
  //               const key = c.payload.key;
  //               return { key, ...data };
  //           })
  //       )
  //   );

  //   this.caca$ = this.db.list('/products')
  //     .snapshotChanges()
  //     .pipe(
  //       map(actions => 
  //         actions.map()
  //           .filter((item: Product) => item.visits > 4)));


  //       // .snapshotChanges()
  //       // .pipe(
  //       //     map(changes =>
  //       //         changes.map(c => {
                    
  //       //         })
  //       //     )
  //       // );
  //       console.log("aici oare:", this.caca$);
  // }

  getAll() {
    return this.db.list<Product>('/products')
        .snapshotChanges()
        .pipe(
            map(changes =>
                changes.map(c => {
                    const data = c.payload.val() as Product;
                    const key = c.payload.key;
                    return { key, ...data };
                })
            )
        );
  }

  get(productId) {
    return this.db.object('/products/' + productId).snapshotChanges(); 
  }

  update(productId, product){
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }
}

  // getAll(){
  //   return this.db.list<Product>('/products').snapshotChanges();
  //   // .pipe(
  //   // map(actions =>
  //   // actions.map(a => ({ key: a.key, ...a.payload.val() } as Product))
  //   // )
  //   // );
  // }

  // getAll(){
  //     return this.db.list('/products').snapshotChanges().pipe(
  //           map(actions =>
  //             actions.map(a => {
  //                title: <fill this from equivalent in a>,
  //                price: <fill this from equivalent in a>,
  //                category: <fill this from equivalent in a>,
  //                imageUrl: <fill this from equivalent in a>
  //             })
  //           )
  //         );
      
  // }   