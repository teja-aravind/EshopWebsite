import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$;
  @Input('category') category;

  constructor(
    private categoryService : CategoryService
  ) { }

  ngOnInit(): void {
    this.getCategoriesList();
  }

  getCategoriesList() {
    this.categoryService.getCategories().snapshotChanges().pipe(
      map(changes =>{
        this.categories$ = changes;
        //console.log(this.categories$);
      })
    ).subscribe();
  }

}
