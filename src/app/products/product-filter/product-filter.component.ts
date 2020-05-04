import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Options } from 'ng5-slider';

// var value: number = 0;
@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;

  @Input('category') category;
  @Output() priceEvent = new EventEmitter();

  constructor(categoryService: CategoryService) {
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
