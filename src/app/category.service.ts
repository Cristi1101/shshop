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
}
