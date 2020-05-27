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

  constructor(private recenziiService: RecenziiService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(data => {
      data.forEach(element => {
        this.recenziiService.getAllMyReviews(element.key).subscribe(recenziiData => {
          recenziiData.forEach(element1 => {
            console.log("element: ", element);
            if(element1.uid == this.userID){
              this.recenziileMele.push({
                recenzie: element1, 
                produs: element
              });
            }
          })
        });
      })
    });
  }

}
