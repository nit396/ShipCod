import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { Order } from '../shared/models/order.model';

@Component({
  selector: 'app-shipper',
  templateUrl: './shipper.component.html',
  styleUrls: ['shipper.component.css']
})
export class ShipperComponent {

  orders: Order[] = [];
  isLoading = true;

  constructor(public auth: AuthService,
    private router: Router,
    public toast: ToastComponent,
    private orderService: OrderService) { }

  ngOnInit() {
    this.getAllOrder();
  }

  getAllOrder() {
    this.orderService.getOrders().subscribe(
      data => {this.orders = data;console.log(this.orders)},
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  shipperAccepted(order) {
    this.orderService.shipperAccepted(order).subscribe(
      res => {
        this.toast.setMessage('you successfully accepted!', 'success');
        this.router.navigate(['/shipper']);
      },
      error => this.toast.setMessage('Accept fail', 'danger')
    );
  }
}
