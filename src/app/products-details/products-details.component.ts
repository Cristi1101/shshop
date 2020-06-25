import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';
import { RecenziiService } from '../recenzii.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent {

  checked: boolean;
  product;
  id;
  reviews = [];

  constructor(
    private route: ActivatedRoute,
    private recenziiService: RecenziiService,
    private productService: ProductService,
    private userService: UserService,
    public cartService: ShoppingCartService) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.productService.get(this.id).pipe(take(1)).subscribe(p => (this.product = p));
    this.getReviews();
  }

  getReviews(){
    this.recenziiService.getAllMyReviews(this.id).subscribe(recenziiData => {
      recenziiData.forEach(element1 => {
        this.userService.getUser(element1.uid).subscribe(data => {
          this.reviews.push({
            recenzie: element1,
            user: data.payload.val()
          });
        });
      })
    });
  }

  addToCart() {
    if (window.confirm('Product added to shopping-cart!'))
      this.cartService.addToCart(this.product.payload.val());
  }
}
