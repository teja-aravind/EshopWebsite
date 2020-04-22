import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  
  isCollapsed = true;

  orders = [];

  constructor(
    orderService : OrderService,
    private modalService: NgbModal
  ) { 
    orderService.getOrders().snapshotChanges().subscribe(
      sub => {
        sub.forEach(i => {
          this.orders.push(i.payload.toJSON());
        });
      }
    )
  }

  ngOnInit() {
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

}
