import { Component, OnInit } from '@angular/core';
import { ServiciuRecenzii } from '../../serviciu-recenzii.service';
import { ServiciuProduse } from '../../serviciu-produse.service';
import { ServiciuUtilizatori } from '../../serviciu-utilizatori.service';

@Component({
  selector: 'administrare-recenzii',
  templateUrl: './administrare-recenzii.component.html',
  styleUrls: ['./administrare-recenzii.component.css']
})
export class AdministrareRecenzii implements OnInit {
  reviews = [];
  user;

  constructor(
    public recenziiService: ServiciuRecenzii,
    private productService: ServiciuProduse,
    private userService: ServiciuUtilizatori) { }

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
