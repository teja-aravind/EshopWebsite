import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  
  userId;
  userSub: Subscription;
  sub: Subscription;
  orders = [];

  constructor(
    private authService : AuthService,
    private modalService: NgbModal,
    private orderService : OrderService
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe(user =>{
      this.userId = user.uid;
      this.orderService.getOrdersByUser(this.userId).snapshotChanges().subscribe(i => {
        i.forEach(ele => {
          this.orders.push(ele.payload.toJSON());
        });
      })
    });
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

}
