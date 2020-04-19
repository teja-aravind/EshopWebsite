import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  cart$;

  appUser : AppUser;

  constructor(
    private cartService : ShoppingCartService,
    private auth: AuthService
    ) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getShoppingCart();
  }

  logout() {
    this.auth.logout();
  }

}
