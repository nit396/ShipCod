import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { Order } from '../shared/models/order.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['customer.component.css']
})
export class CustomerComponent {

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
      data => { this.orders = data; console.log(this.orders) },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  customerAccepted(order) {
    this.orderService.customerAccepted(order).subscribe(
      res => {
        this.toast.setMessage('you successfully confirm!', 'success');
        this.router.navigate(['/shipper']);
      },
      error => this.toast.setMessage('Confirm fail', 'danger')
    );
  }
}
