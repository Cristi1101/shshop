import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciuDeAutentificare } from '../serviciu-de-autentificare.service';
import { Utilizator } from '../models/utilizator';
import { ServiciuUtilizatori } from '../serviciu-utilizatori.service';
import { ServiciuCosDeCumparaturi } from '../serviciu-cos-de-cumparaturi.service';
import { CosDeCumparaturi } from '../models/cos-de-cumparaturi';
import { Subscription } from 'rxjs/Subscription';
import { ServiciuComenzi } from '../serviciu-comenzi.service';
// import 'rxjs/add/operators/map';
import { Comanda } from '../models/comanda';

declare var paypal;

@Component({
  selector: 'trimite-comanda',
  templateUrl: './trimite-comanda.component.html',
  styleUrls: ['./trimite-comanda.component.css']
})
export class TrimiteComanda implements OnInit, OnDestroy {
  users: Utilizator;
  userID = localStorage.getItem('userUID');
  cart: CosDeCumparaturi;
  subscription: Subscription;

  shoppingCartItemCount: number;
  cart2$;
  cart2: CosDeCumparaturi = new CosDeCumparaturi(null);
  shoppingCartTotalPrice: number;
  shoppingCart: CosDeCumparaturi;

  @ViewChild('paypal', { static: true }) paypalElem: ElementRef;

  constructor(
    private router: Router,
    public authService: ServiciuDeAutentificare,
    private userService: ServiciuUtilizatori,
    private shoppingCartService: ServiciuCosDeCumparaturi,
    private orderService: ServiciuComenzi) {
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
    this.subscription = cart$.valueChanges().subscribe((cart: CosDeCumparaturi) => this.cart = cart);
    this.cart2$ = await this.shoppingCartService.getCart();
    this.cart2$.valueChanges().subscribe((temp) => {
      let data: any;
      data = temp.items;
      this.cart2 = new CosDeCumparaturi(data);
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
    let order = new Comanda(this.userID, this.users, this.cart);
    let result = await this.orderService.placeOrder(order);

    this.router.navigate(['/order-success/', result.key]);
  }

  cancel() {
    this.router.navigate(['/shopping-cart']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
