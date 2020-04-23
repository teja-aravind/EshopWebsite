import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

 collapse = false;

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

  navBar() {
    this.collapse = !this.collapse;
  }

  logout() {
    this.auth.logout();
  }

}
