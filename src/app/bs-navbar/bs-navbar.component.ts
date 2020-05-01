import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  appUser: AppUser;
  shoppingCartItemCount: number;
  cart$;
  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) { }

  logout(){
    this.auth.logout();
  }

  // async ngOnInit(){
  //   this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

  //   const cart$ = await this.shoppingCartService.getCart();
  //   cart$.snapshotChanges().subscribe((temp) => {
  //     let data: any;
  //     data = temp.payload.child('/items').val();
  //     let cart = new ShoppingCart(data);
  //     this.shoppingCartItemCount = cart.totalItemsCount;
  //    });
  // }
  // async ngOnInit(){
  //   this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

  //   const cart$ = await this.shoppingCartService.getCart();
  //   cart$.snapshotChanges().subscribe((cart) => {
  //     this.shoppingCartItemCount = 0;
  //     for( let productId in cart.payload.child('/itemsMap'))
  //       this.shoppingCartItemCount += cart.payload.child('/itemsMap').val();
  //    });
  // }

  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);


    this.cart$ = await this.shoppingCartService.getCart();
    this.cart$.valueChanges().subscribe((cart: ShoppingCart) => {
      this.shoppingCartItemCount = 0;
      for( let productId in cart.items)
        this.shoppingCartItemCount += cart.items[productId].quantity;
     });

    //  if (!localStorage.getItem('foo')) { 
    //   localStorage.setItem('foo', 'no reload') 
    //   location.reload() 
    // } else {
    //   localStorage.removeItem('foo') 
    // }

    // function reloadIfNecessary() {
    //   var isLoadedBefore = localstorage.getItem("IsLoadedBefore");
    //   if(isLoadedBefore=="true")
    //      return;
    //   }
    //   else {
    //   localstorage.setItem("IsLoadedBefore",true);
    //   /*use your reload method*/
    //   })
  } 
}
