import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServiciuCategorii } from 'src/app/serviciu-categorii.service';
import { Options } from 'ng5-slider';

// var value: number = 0;
@Component({
  selector: 'filtru-produse',
  templateUrl: './filtru-produse.component.html',
  styleUrls: ['./filtru-produse.component.css']
})
export class FiltruProduse implements OnInit {
  categories$;

  @Input('category') category;
  @Output() priceEvent = new EventEmitter();

  constructor(categoryService: ServiciuCategorii) {
    this.categories$ = categoryService.getAll();
   }

  value: number = 0;
  highValue: number = 999;

  myFunctionMin(value){
    this.value = value;
  }

  myFunctionMax(value){
    this.highValue = value;
  }

  options: Options = {
     floor: 0,
     ceil: 3500
  };

  ngOnInit(): void {
  } 

  sendMessage(value, value2){
    this.priceEvent.emit([value, value2]);
  }
}