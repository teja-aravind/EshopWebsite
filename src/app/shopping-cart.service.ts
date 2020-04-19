import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, take } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private db: AngularFireDatabase
    ) { }

    private getItem(cartId: string, productId: string) {
      return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
    }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated : new Date().getTime()
    });
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  async getShoppingCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges().pipe(map(x => {
      let temp : any = x;
      return new ShoppingCart(temp.payload.toJSON().items)
    }));
  }

  async getcart(product) {
    let cartId = await this.getOrCreateCartId();
    return this.getItem(cartId, product.key);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
        return result.key;
    }

    return cartId;
  }

  async addToShoppingCart(product){
    this.UpdateQuantity(product, 1);
  }

  async removeFromCart(product) {
    this.UpdateQuantity(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private async UpdateQuantity(product,change) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe(sub => {
      let temp : any = sub;
      let quan = temp.payload.toJSON() ? temp.payload.toJSON().quantity : 0;
      let prod = product.payload.toJSON();
      if(quan === 1 && change === -1) {
        item$.remove();
      }else {
        item$.update({ product : prod, quantity : quan + change });
      }
    })
  }

}
