import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Order } from '../shared/models/order.model';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('/api/createOrder', {order, UsrAddr: "mobile give pill glass fiber round bullet brisk doctor decline abstract deal"});
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('/api/getAllOrder');
  }

  shipperAccepted(order) {
    return this.http.post('/api/shipperaccepted', {order, UsrAddr: "dismiss market still equal three brief stool brisk unlock hunt tonight shed"});
  }

  customerAccepted(order) {
    return this.http.post('/api/customerAccepted', {order, UsrAddr: "submit other bulb away diagram gallery skill suggest win moment dizzy situate"});
  }
}
