import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { SellerComponent } from './seller/seller.component';
import { SharedComponent } from './shared/shared.component';
import { ProductsComponent } from './shared/products/products.component';
import { CartComponent } from './customer/cart/cart.component';
import { OrdersComponent } from './customer/orders/orders.component';
import { LoginComponent } from './shared/login/login.component';
import { AuthGuard } from './shared/login/authentication-guard';
import { RegisterComponent } from './shared/login/register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserComponent } from './customer/user.component';
import { ProductComponent } from './shared/products/product/product.component';
import { OrderDetailsComponent } from './customer/orders/order-details/order-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { AuthInterceptorService } from './shared/login/service/auth-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    SellerComponent,
    SharedComponent,
    ProductsComponent,
    CartComponent,
    OrdersComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    ProductComponent,
    OrderDetailsComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
