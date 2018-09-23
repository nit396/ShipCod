import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../services/order.service';
import { ToastComponent } from '../shared/toast/toast.component';
@Component({
  selector: 'new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['new-order.component.css']
})
export class NewOrderComponent {

  id = new FormControl('', [
    Validators.required,
  ]);
  name = new FormControl('', [
    Validators.required,
  ]);
  cost = new FormControl('', [
    Validators.required,
  ]);
  address = new FormControl('', [
    Validators.required,
  ]);

  orderForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    public toast: ToastComponent) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      id: this.id,
      name: this.name,
      cost: this.cost,
      address: this.address,
    });
  }

  createOrder() {
    this.orderService.createOrder(this.orderForm.value).subscribe(
      res => {
        this.toast.setMessage('you successfully create new order!', 'success');
        this.router.navigate(['/shopper']);
      },
      error => this.toast.setMessage('Fail create order', 'danger')
    );
  }
}
