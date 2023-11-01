import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './shared/products/products.component';
import { LoginComponent } from './shared/login/login.component';
import { AuthGuard } from './shared/login/authentication-guard';
import { RegisterComponent } from './shared/login/register.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './customer/user.component';
import { CartComponent } from './customer/cart/cart.component';
import { OrdersComponent } from './customer/orders/orders.component';
import { SellerComponent } from './seller/seller.component';
import { OrderDetailsComponent } from './customer/orders/order-details/order-details.component';
import { ProductComponent } from './shared/products/product/product.component';
import { NavComponent } from './nav/nav.component';

const routes: Routes = [
  {
    path: '', // This is your default layout with the navbar
    component: NavComponent,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthGuard],
      },
      { path: 'products/:id', component: ProductComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'user', component: UserComponent },
      { path: 'cart', component: CartComponent },
      {
        path: 'orders',
        component: OrdersComponent,
        children: [
          {
            path: ':id',
            component: OrderDetailsComponent,
          },
        ],
      },
      { path: 'seller', component: SellerComponent },
      { path: 'viewUsers', component: AdminComponent },
    ],
  },
  // 'login' and 'register' routes are outside the default layout
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
