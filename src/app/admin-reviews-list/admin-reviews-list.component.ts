import { Component, OnInit } from '@angular/core';
import { RecenziiService } from '../recenzii.service';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'app-admin-reviews-list',
  templateUrl: './admin-reviews-list.component.html',
  styleUrls: ['./admin-reviews-list.component.css']
})
export class AdminReviewsListComponent implements OnInit {
  reviews = [];
  user;

  constructor(
    public recenziiService: RecenziiService,
    private productService: ProductService,
    private userService: UserService) { }

  getReviews() {
    this.productService.getAll().subscribe(data => {
      data.forEach(element => {
        this.recenziiService.getAllMyReviews(element.key).subscribe(recenziiData => {
          recenziiData.forEach(element1 => {
            this.userService.getUser(element1.uid).subscribe(data => {
              this.reviews.push({
                recenzie: element1,
                produs: element,
                prodId: element.key,
                user: data.payload.val()
              });
            });
          })
        });
      })
    });
  }

  ngOnInit(): void {
    this.getReviews();
  }
}
