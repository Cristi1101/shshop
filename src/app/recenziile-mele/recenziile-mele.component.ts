import { Component, OnInit } from '@angular/core';
import { ServiciuRecenzii } from '../serviciu-recenzii.service';
import { ServiciuProduse } from '../serviciu-produse.service';
import { ServiciuUtilizatori } from '../serviciu-utilizatori.service';

@Component({
  selector: 'recenziile-mele',
  templateUrl: './recenziile-mele.component.html',
  styleUrls: ['./recenziile-mele.component.css']
})
export class RecenziileMele implements OnInit {
  userID = localStorage.getItem('userUID');
  recenziileMele = [];

  constructor(
    public recenziiService: ServiciuRecenzii,
    private productService: ServiciuProduse,
    private userService: ServiciuUtilizatori) { }

  getReviews() {
    this.productService.toateProdusele().subscribe(data => {
      data.forEach(element => {
        this.recenziiService.primesteToateRecenziile(element.key).subscribe(recenziiData => {
          recenziiData.forEach(element1 => {
            this.userService.primesteUtilizator(element1.uid).subscribe(data => {
              if (element1.uid == this.userID) {
                this.recenziileMele.push({
                  recenzie: element1,
                  produs: element,
                  prodId: element.key,
                  user: data.payload.val()
                });
              }
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