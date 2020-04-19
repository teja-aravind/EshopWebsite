import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product;
  @Input('shopping-cart') shoppingCart;

  constructor(
    private cartService : ShoppingCartService
  ) { }

  addToCart() {
    this.cartService.addToShoppingCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
  
  getProductQuan() {
    if(!this.shoppingCart) return 0;

    if(this.shoppingCart.payload && this.product && this.shoppingCart.payload.toJSON().items){
      let item = this.shoppingCart.payload.toJSON().items[this.product.key];
      return item ? item.quantity : 0;
    }else{
      return 0;
    }

  }
}
