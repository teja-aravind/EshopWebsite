import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products = [];
  filteredProducts;
  
  subscription : Subscription;
  sub : Subscription;
  category;
  cart;

  constructor(
    private route : ActivatedRoute,
    private productService : ProductService,
    private shoppingCartService : ShoppingCartService
    ) {}

  async ngOnInit() {
    this.getAll();
    this.sub = (await this.shoppingCartService.getCart()).snapshotChanges().subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.sub.unsubscribe();
  }

  getAll() {
    this.subscription = this.productService.getAll().snapshotChanges().pipe(
      map(changes =>{
        this.products = changes;
        this.route.queryParamMap.subscribe(params => {
          this.category = params.get('category');
          this.filteredProducts = (this.category) ?
          this.products.filter(p => {
            let cat = p.payload.node_.children_.root_.left.left.value.value_;
            if(cat === this.category) {
              return p;
            }
          }) :
          this.products;
        });
      })
    ).subscribe();
  }

}
