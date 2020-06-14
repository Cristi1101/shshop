import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { UserService } from '../user.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs/Subscription';
import { OrderService } from '../order.service';
// import 'rxjs/add/operators/map';
import { Order } from '../models/order';

declare var paypal;

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  users: AppUser;
  userID = localStorage.getItem('userUID');
  cart: ShoppingCart;
  subscription: Subscription;

  shoppingCartItemCount: number;
  cart2$;
  cart2: ShoppingCart = new ShoppingCart(null);
  shoppingCartTotalPrice: number;
  shoppingCart: ShoppingCart;

  @ViewChild('paypal', { static: true }) paypalElem: ElementRef;

  constructor(
    private router: Router,
    public authService: AuthService,
    private userService: UserService,
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService) {
    this.authService.appUser$.subscribe(user => {
      if (user) {
        this.users = user;
        console.log("USER", user);
      }
    });
  }

  paidFor = false;

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.subscription = cart$.valueChanges().subscribe((cart: ShoppingCart) => this.cart = cart);
    console.log("order:", this.cart);

    this.cart2$ = await this.shoppingCartService.getCart();
    this.cart2$.valueChanges().subscribe((temp) => {
      let data: any;
      data = temp.items;
      this.cart2 = new ShoppingCart(data);
      this.shoppingCartItemCount = this.cart2.totalItemsCount;
      this.shoppingCartTotalPrice = this.cart2.totalPrice;
    });



    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.cart.totalItemsCount,
                amount: {
                  value: parseFloat((this.cart2.totalPrice / 4.26).toString()).toFixed(2)
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const ord = await actions.order.capture();
          this.paidFor = true;
          console.log(ord);
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.paypalElem.nativeElement);
  }

  async placeOrder() {
    let order = new Order(this.userID, this.users, this.cart);
    let result = await this.orderService.placeOrder(order);

    this.router.navigate(['/order-success/', result.key]);
  }

  // save(users) {
  //   this.userService.update(this.userID, users);
  //   this.router.navigate(['/my-account']);
  // }


  cancel() {
    this.router.navigate(['/shopping-cart']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
