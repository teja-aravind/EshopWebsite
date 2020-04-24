import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product;
  @Input('shopping-cart') shoppingCart;

  nogut = true;

  constructor(
    private cartService : ShoppingCartService
  ) { }

  ngOnInit() {
    console.log(window.innerWidth)
    if(window.innerWidth < 426){
      this.nogut = false;
    }
  }

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
