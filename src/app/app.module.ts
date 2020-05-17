import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular7-data-table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccesComponent } from './order-succes/order-succes.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { UserService } from './user.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';
import { CreateProductFormComponent } from './admin/create-product-form/create-product-form.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ColorsService } from './colors.service';
import { SubcategoriesService } from './subcategories.service';
import { Ng5SliderModule } from 'ng5-slider';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminUsersListComponent } from './admin/admin-users-list/admin-users-list.component';
import { UsersFormComponent } from './admin/users-form/users-form.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { OrderService } from './order.service';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { OrdersFormComponent } from './orders-form/orders-form.component';
import { MyOrdersDetailsComponent } from './my-orders-details/my-orders-details.component';
import { MyOrdersFormComponent } from './my-orders-form/my-orders-form.component';
import { PlataComponent } from './plata/plata.component';



@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccesComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    OrdersFormComponent,
    ProductFormComponent,
    CreateProductFormComponent,
    ProductFilterComponent,
    ProductQuantityComponent,
    ProductCardComponent,
    LoginComponent,
    SignUpComponent,
    AdminUsersListComponent,
    UsersFormComponent,
    MyAccountComponent,
    EditAccountComponent,
    ShoppingCartSummaryComponent,
    MyOrdersDetailsComponent,
    MyOrdersFormComponent,
    PlataComponent
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    DataTableModule,
    NgbModule,
    Ng5SliderModule,
    RouterModule.forRoot([
      {path: '', component: ProductsComponent},
      {path: 'homepage', component: HomeComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignUpComponent},
      {path: 'my-account', component: MyAccountComponent},
      {path: 'edit-account', component: EditAccountComponent},

      {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
      {path: 'order-success/:id', component: OrderSuccesComponent, canActivate: [AuthGuard]},
      {path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard]},
      {path: 'my-orders/:id', component: MyOrdersDetailsComponent, canActivate: [AuthGuard]},

      {path: 'admin/products/new', component: CreateProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/orders/:id', component: OrdersFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/users', component: AdminUsersListComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/users/:id', component: UsersFormComponent, canActivate: [AuthGuard, AdminAuthGuard]}
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    CategoryService,
    ColorsService,
    SubcategoriesService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
