import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../favorites.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-my-favourites',
  templateUrl: './my-favourites.component.html',
  styleUrls: ['./my-favourites.component.css']
})
export class MyFavouritesComponent implements OnInit {

  favourites = [];


  constructor(
    public cartService: ShoppingCartService,
    public favouriteService: FavoritesService) {
    this.favouriteService.getFavourites().subscribe(data => {
      data.forEach(element => {
        this.favourites.push(element.payload.val());
        console.log("favourites:", element.payload.val()); 
      })
    });
   }

  ngOnInit(): void {
  }

}
