import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private dbPath = '/category';

  constructor(private db: AngularFireDatabase) {}

  getCategories() {
    return this.db.list(this.dbPath, ref => ref.orderByChild('name'));
  }

}
