import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  page = 1;
  pageSize =5;

  products;
  filteredProducts;
  subscription : Subscription;

  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.getAll();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getAll() {
    this.subscription = this.productService.getAll().snapshotChanges().pipe(
      map(changes =>{
        this.filteredProducts = this.products = changes;
      })
    ).subscribe();
  }

  filter(query) {
    this.filteredProducts = (query) ?
    this.products.filter(p => {
      let title = p.payload.node_.children_.root_.right.value.value_;
      title = title.toLowerCase();
      if(title.includes(query.toLowerCase())) {
        return p;
      }
    }) :
    this.products;
  }

}
