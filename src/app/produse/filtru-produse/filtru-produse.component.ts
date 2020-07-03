import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServiciuCategorii } from 'src/app/serviciu-categorii.service';
import { Options } from 'ng5-slider';

@Component({
  selector: 'filtru-produse',
  templateUrl: './filtru-produse.component.html',
  styleUrls: ['./filtru-produse.component.css']
})
export class FiltruProduse implements OnInit {
  categorii$;

  @Input('categorie') categorie;
  @Output() evenimentPret = new EventEmitter();

  constructor(serviciuCategorii: ServiciuCategorii) {
    this.categorii$ = serviciuCategorii.toateCategoriile();
   }

  value: number = 0;
  highValue: number = 999;

  functieMin(value){
    this.value = value;
  }

  functieMax(value){
    this.highValue = value;
  }

  options: Options = {
     floor: 0,
     ceil: 3500
  };

  ngOnInit(): void {
  } 

  trimiteMesaj(valoare1, valoare2){
    this.evenimentPret.emit([valoare1, valoare2]);
  }
}