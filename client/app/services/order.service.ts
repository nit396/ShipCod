import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Order } from '../shared/models/order.model';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('/api/createOrder', order);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('/api/getAllOrder');
  }

  shipperAccepted(id: string) {
    return this.http.post('/api/shipperaccepted', id);
  }

  customerAccepted(id: string) {
    return this.http.post('/api/customerAccepted', id);
  }
}
