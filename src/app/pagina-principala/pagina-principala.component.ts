import { Component } from '@angular/core';
import { ServiciuProduse } from '../serviciu-produse.service';

@Component({
  selector: 'pagina-principala',
  templateUrl: './pagina-principala.component.html',
  styleUrls: ['./pagina-principala.component.css']
})
export class PaginaPrincipala {
  celeMaiVizitateProduse = [];
  ultimeleProduseVizitate = [];

  indexSelectat = 0;
  indexSelectat1 = 0;

  constructor(private serviciuProduse: ServiciuProduse) {
    this.serviciuProduse.celeMaiVizitateProduse().subscribe(data => {
      let aux;
      for (let i = 0; i < data.length / 2; i++) {
        aux = data[i];
        data[i] = data[data.length - i - 1];
        data[data.length - i - 1] = aux;
      }
      this.celeMaiVizitateProduse = data;
    });

    this.serviciuProduse.ultimeleProduseVizitate().subscribe(data => {
      let aux;
      for (let i = 0; i < data.length / 2; i++) {
        aux = data[i];
        data[i] = data[data.length - i - 1];
        data[data.length - i - 1] = aux;
      }
      this.ultimeleProduseVizitate = data;
    });
  }
}
