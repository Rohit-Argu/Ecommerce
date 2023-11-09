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
import { AddProductComponent } from './seller/add-product/add-product.component';
import { EditProductComponent } from './seller/edit-product/edit-product.component';
import { EditProfileComponent } from './customer/edit-profile/edit-profile.component';
import { SavedAddressesComponent } from './customer/saved-addresses/saved-addresses.component';
import { EditAddressComponent } from './customer/saved-addresses/edit-address/edit-address.component';
import { roleGuard } from './shared/login/role.guard';
import { AddressPaymentComponent } from './customer/address-payment/address-payment.component';

const routes: Routes = [
  {
    path: '', // This is your default layout with the navbar
    component: NavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      {
        path: 'products',
        component: ProductsComponent,
      },
      { path: 'products/:id', component: ProductComponent },
      { path: 'viewUsers', component: AdminComponent, canActivate:[roleGuard], data:{role:'admin'} },
      { path: 'user', component: UserComponent },
      { path: 'savedAddresses', component: SavedAddressesComponent, canActivate:[roleGuard], data:{role:'customer'} },
      { path: 'editAddress/:id', component: EditAddressComponent , canActivate:[roleGuard], data:{role:'customer'}},
      { path: 'editProfile', component: EditProfileComponent },
      { path: 'cart', component: CartComponent , canActivate:[roleGuard], data:{role:'customer'}},
      { path: 'checkout', component: AddressPaymentComponent , canActivate:[roleGuard], data:{role:'customer'}},
      {
        path: 'orders',
        component: OrdersComponent, canActivate:[roleGuard], data:{role:'customer'},
        children: [
          {
            path: ':id',
            component: OrderDetailsComponent,
          },
        ],
      },
      { path: 'listedProducts', component: SellerComponent , canActivate:[roleGuard], data:{role:'seller'}},
      { path: 'addProduct' , component:AddProductComponent, canActivate:[roleGuard], data:{role:'seller'} },
      { path: 'editProduct/:id' , component:EditProductComponent, canActivate:[roleGuard], data:{role:'seller'}},
    ],
  },
  // 'login' and 'register' routes are outside the default layout
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path:'**', redirectTo:'products' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
