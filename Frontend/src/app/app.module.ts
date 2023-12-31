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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { AuthInterceptorService } from './shared/login/service/auth-interceptor.service';
import { AddProductComponent } from './seller/add-product/add-product.component';
import { EditProductComponent } from './seller/edit-product/edit-product.component';
import { EditProfileComponent } from './customer/edit-profile/edit-profile.component';
import * as ngBootstrap from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SavedAddressesComponent } from './customer/saved-addresses/saved-addresses.component';
import { EditAddressComponent } from './customer/saved-addresses/edit-address/edit-address.component';
import {MatCardModule} from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { AddressPaymentComponent } from './customer/address-payment/address-payment.component';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';


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
    NavComponent,
    AddProductComponent,
    EditProductComponent,
    EditProfileComponent,
    SavedAddressesComponent,
    EditAddressComponent,
    AddressPaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ngBootstrap.NgbModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatCardModule,
    MatSelectModule,
    SocialLoginModule,
    GoogleSigninButtonModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi:true
  },{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '968868325006-u17s49aqmuu6lagj9r06tjlm0g8mn0r7.apps.googleusercontent.com',
            {
              oneTapEnabled: false,
            }
          )
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
