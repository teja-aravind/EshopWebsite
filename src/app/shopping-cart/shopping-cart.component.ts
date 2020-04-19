import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ProductService } from '../product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  cart$;
  sub;
  products;
  subscription;
  shopCart;

  constructor(
    private shoppingCartService : ShoppingCartService,
    private productService : ProductService
    ) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getShoppingCart();
    this.getAll();
    this.sub = (await this.shoppingCartService.getCart()).snapshotChanges().subscribe(cart => this.shopCart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.sub.unsubscribe();
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

  getAll() {
    this.subscription = this.productService.getAll().snapshotChanges().pipe(
      map(changes =>{
        this.products = changes;
      })
    ).subscribe();
  }

}
