import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Services
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';

// Components
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { ShopperComponent } from './shopper/shopper.component';
import { ShipperComponent } from './shipper/shipper.component';
import { CustomerComponent } from './customer/customer.component';
import { NewOrderComponent } from './new-order/new-order.component'

import { NotFoundComponent } from './not-found/not-found.component';
import { BatchComponent } from './batch/batch.component';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'batchs', component: BatchComponent, canActivate: [AuthGuardLogin] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
  { path: 'notfound', component: NotFoundComponent },
  { path: 'shopper', component: ShopperComponent },
  { path: 'shopper/new-order', component: NewOrderComponent },
  { path: 'shipper', component: ShipperComponent },
  { path: 'customer', component: CustomerComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule { }
