import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shipping : any = {}; 
  cart : ShoppingCart;
  userId;
  cartSub : Subscription;
  userSub : Subscription;

  constructor(
    private shoppingCartService : ShoppingCartService,
    private router : Router,
    private authService : AuthService,
    private orderService : OrderService
  ) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getShoppingCart();
    this.cartSub = cart$.subscribe(cart => {
      this.cart = cart;
    });
    this.userSub = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.cartSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

}