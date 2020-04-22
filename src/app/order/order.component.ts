import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input('order') order;
  products = [];
  Total;

  constructor() { }

  ngOnInit() {
    let Total = 0;
    console.log(this.order)
    for(let id in this.order){
      this.products.push(this.order[id]);
      Total += this.order[id].totalPrice;
    }
    this.Total= Total;
  }

}
