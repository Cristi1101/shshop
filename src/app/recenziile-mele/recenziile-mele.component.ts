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
  idUtilizator = localStorage.getItem('userUID');
  recenziileMele = [];

  constructor(
    public serviciuRecenzii: ServiciuRecenzii,
    private serviciuProduse: ServiciuProduse,
    private serviciuUtilizatori: ServiciuUtilizatori) { }

  recenzii() {
    this.serviciuProduse.toateProdusele().subscribe(date => {
      date.forEach(element => {
        this.serviciuRecenzii.primesteToateRecenziile(element.key).subscribe(dateRecenzii => {
          dateRecenzii.forEach(element1 => {
            this.serviciuUtilizatori.primesteUtilizator(element1.uid).subscribe(date => {
              if (element1.uid == this.idUtilizator) {
                this.recenziileMele.push({
                  recenzie: element1,
                  produs: element,
                  prodId: element.key,
                  user: date.payload.val()
                });
              }
            });
          })
        });
      })
    });
  }

  ngOnInit(): void {
    this.recenzii();
  }
}