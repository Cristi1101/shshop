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
  recenzii = [];

  constructor(
    public serviciuRecenzii: ServiciuRecenzii,
    private serviciuProduse: ServiciuProduse,
    private serviciuUtilizatori: ServiciuUtilizatori) { }

  obtineRecenzii() {
    this.serviciuProduse.toateProdusele().subscribe(date => {
      date.forEach(element => {
        this.serviciuRecenzii.primesteToateRecenziile(element.key).subscribe(dateRecenzii => {
          dateRecenzii.forEach(element1 => {
            this.serviciuUtilizatori.primesteUtilizator(element1.uid).subscribe(date => {
              this.recenzii.push({
                recenzie: element1,
                produs: element,
                prodId: element.key,
                utilizator: date.payload.val()
              });
            });
          })
        });
      })
    });
  }

  ngOnInit(): void {
    this.obtineRecenzii();
  }
}
