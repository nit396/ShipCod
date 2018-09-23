import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { Order } from '../shared/models/order.model';

@Component({
  selector: 'app-shopper',
  templateUrl: './shopper.component.html',
  styleUrls: ['shopper.component.css']
})
export class ShopperComponent {

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
      data => this.orders = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  createOrder() {
    this.router.navigate(['/shopper/new-order']);
  }
}
