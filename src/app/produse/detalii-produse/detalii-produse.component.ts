import { Component } from '@angular/core';
import { ServiciuProduse } from '../../serviciu-produse.service';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ServiciuCosDeCumparaturi } from '../../serviciu-cos-de-cumparaturi.service';
import { ServiciuRecenzii } from '../../serviciu-recenzii.service';
import { ServiciuUtilizatori } from '../../serviciu-utilizatori.service';

@Component({
  selector: 'detalii-produse',
  templateUrl: './detalii-produse.component.html',
  styleUrls: ['./detalii-produse.component.css']
})
export class DetaliiProduse {
  checked: boolean;
  product;
  id;
  reviews = [];

  constructor(
    private route: ActivatedRoute,
    private recenziiService: ServiciuRecenzii,
    private productService: ServiciuProduse,
    private userService: ServiciuUtilizatori,
    public cartService: ServiciuCosDeCumparaturi) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.productService.toateProdusele2(this.id).pipe(take(1)).subscribe(p => (this.product = p));
    this.getReviews();
  }

  getReviews() {
    this.recenziiService.primesteToateRecenziile(this.id).subscribe(recenziiData => {
      recenziiData.forEach(element1 => {
        this.userService.primesteUtilizator(element1.uid).subscribe(data => {
          this.reviews.push({
            recenzie: element1,
            user: data.payload.val()
          });
        });
      })
    });
  }

  addToCart() {
    if (window.confirm('Produs adaugat in cosul de cumparaturi!'))
      this.cartService.adaugaInCosulDeCumparaturi(this.product.payload.val());
  }
}