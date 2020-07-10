import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'comanda-efectuata',
  templateUrl: './comanda-efectuata.component.html',
  styleUrls: ['./comanda-efectuata.component.css']
})
export class ComandaEfectuata{
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
