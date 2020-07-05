import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-succes',
  templateUrl: './order-succes.component.html',
  styleUrls: ['./order-succes.component.css']
})
export class OrderSuccesComponent{
  idComanda;

  constructor(
    private rutaActiva: ActivatedRoute,
    private ruta: Router) {
    this.idComanda = this.rutaActiva.snapshot.paramMap.get('id');
   }

   accesareComanda(){
    this.ruta.navigate(['/comenzile-mele/', this.idComanda]);
   }
}
