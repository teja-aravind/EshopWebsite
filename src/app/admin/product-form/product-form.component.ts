import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { map, take } from 'rxjs/operators';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  id;
  product;
  productImageUrl;
  productTitle;
  productPrice; 
  productCategory;

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private categoryService : CategoryService, 
    private productService : ProductService
    ) {}

  ngOnInit() {
    this.getCategoriesList();
    this.getProduct();
  }

  getCategoriesList() {
    this.categoryService.getCategories().snapshotChanges().pipe(
      map(changes =>{
        this.categories$ = changes;
      })
    ).subscribe();
  }

  getProduct(){
    this.id = this.route.snapshot.paramMap.get('id');
      if(this.id) {
        this.productService.getProduct(this.id).snapshotChanges().pipe(take(1)).subscribe(p => {
           this.product = p;
            this.productImageUrl = this.product.payload.node_.children_.root_.left.value.value_;
            this.productCategory = this.product.payload.node_.children_.root_.left.left.value.value_;
            this.productTitle = this.product.payload.node_.children_.root_.right.value.value_;
            this.productPrice = this.product.payload.node_.children_.root_.value.value_;
          });
      }
  }

  save(product) {
    if(this.id) {
      this.productService.updateProduct(this.id, product);
    }else {
      this.productService.create(product);
    }
    
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if(confirm('Are you Sure to Delete this Product?')) {
      this.productService.deleteProduct(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

}
