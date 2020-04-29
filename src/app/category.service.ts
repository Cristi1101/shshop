import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Category } from './models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(){
    return this.db.list('/categories').snapshotChanges();
  }

  getAll() { 
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges();
  }

  // getAll() {
  //   return this.db
  //     .list('categories', reference => reference.orderByChild('name'))
  //     .snapshotChanges() // include snapshot itself (access to key property)
  //     .pipe(map(metadata => metadata.map(data => ({ key: data.payload.key }))));
  // }


  // getAll() {
  //   return this.db
  //     .list<Category>('/categories', ref => ref.orderByChild('name'))
  //     .snapshotChanges() // include snapshot itself (access to key property)
  //     .pipe(map(metadata => metadata.map(data => ({ key: data.payload.key, ...data.payload.val() } as Category))));
  // }

//   getAll() {
//     return this.db.list<Category>('/categories')
//         .snapshotChanges()
//         .pipe(
//             map(changes =>
//                 changes.map(c => {
//                     const data = c.payload.val() as Category;
//                     const key = c.payload.key;
//                     return { key, ...data };
//                 })
//             )
//         );
// }
  // getAll() {
  //   return this.db.list('/categories', ref => (ref.orderByChild('name')))
  //   .snapshotChanges().pipe(
  //     map(actions => 
  //       actions.map(a => ({ key: a.key, ...a.payload.val() }))
  //     )
  //   );
  // }


  // getAll1() {
  //   return this.db.list<Category>('/categories')
  //       .snapshotChanges()
  //       .pipe(
  //           map(changes =>
  //               changes.map(c => {
  //                   const data = c.payload.val() as Category;
  //                   const id = c.payload.key;
  //                   return { id, ...data };
  //               })
  //           )
  //       );
  // }
}
