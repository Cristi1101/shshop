import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { UserService } from '../user.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs/Subscription';
import { OrderService } from '../order.service';
import 'rxjs/add/operator/map';
import { Order } from '../models/order';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  users: AppUser;
  userID = localStorage.getItem('userUID');

  //shipping: AppUser;
  cart: ShoppingCart;
  subscription: Subscription;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private userService: UserService,
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService)
    {
      this.authService.appUser$.subscribe(user => {
        if (user) {
          this.users = user;
          console.log("USER", user);
        }
      });
    }
     
  
  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.subscription = cart$.valueChanges().subscribe((cart: ShoppingCart) => this.cart = cart);
    console.log("order:", this.cart);
  }

    placeOrder(){
      //let order = new Order(this.userID, this.users, this.cart);
      let order = {
        datePlaced: new Date().getTime(),
        shipping: this.users,
        items: this.cart.items
      };
      this.orderService.storeOrder(order);
    }

  // save(users) {
  //   this.userService.update(this.userID, users);
  //   this.router.navigate(['/my-account']);
  // }


  cancel(){
    this.router.navigate(['/']);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
