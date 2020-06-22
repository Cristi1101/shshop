import { Component, OnInit } from '@angular/core';
import { RecenziiService } from '../recenzii.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-recenzii-user',
  templateUrl: './recenzii-user.component.html',
  styleUrls: ['./recenzii-user.component.css']
})
export class RecenziiUserComponent implements OnInit {
  userID = localStorage.getItem('userUID');
  recenziileMele = [];

  constructor(public recenziiService: RecenziiService,
    private productService: ProductService) { }

  getReviews() {
    this.productService.getAll().subscribe(data => {
      data.forEach(element => {
        this.recenziiService.getAllMyReviews(element.key).subscribe(recenziiData => {
          recenziiData.forEach(element1 => {
            if (element1.uid == this.userID) {
              this.recenziileMele.push({
                recenzie: element1,
                produs: element,
                prodId: element.key
              });
            }
          })
        });
      })
    });
  }


  ngOnInit(): void {
    this.getReviews();
  }
}
