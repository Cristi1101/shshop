import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs-compat/operator/map';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(){
    return this.db.list('/categories').snapshotChanges();
  }

  // getCategories(){
  //   return this.db.list('/categories').snapshotChanges();
  // }

  // getAll() {
  //   return this.db.list('/categories', ref => (ref.orderByChild('name')))
  //   .snapshotChanges()
  //     map(actions => 
  //       actions.map(a => ({ key: a.payload.key, ...a.payload.val() }))
  //     )
  //   );
  //}
}
