import { Component } from '@angular/core';
import { ServiciuUtilizatori } from 'src/app/serviciu-utilizatori.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'administrare-utilizatori-detalii',
  templateUrl: './administrare-utilizatori-detalii.component.html',
  styleUrls: ['./administrare-utilizatori-detalii.component.css']
})

export class AdministrareUtilizatoriDetalii {
  utilizator;
  idUtilizator;

  constructor(
    private ruta: Router,
    private rutaActiva: ActivatedRoute,
    public serviciuUtilizatori: ServiciuUtilizatori) {
    this.idUtilizator = this.rutaActiva.snapshot.paramMap.get('id');
    if (this.idUtilizator)
      this.serviciuUtilizatori.primesteUtilizator(this.idUtilizator).pipe(take(1)).subscribe(utilizator => (this.utilizator = utilizator));
  }

  salvareModificari(utilizator) {
    this.serviciuUtilizatori.actualizareUtilizator(this.idUtilizator, utilizator);
    this.ruta.navigate(['/administrator/utilizatori']);
  }

  stergeUtilizator() {
    if (!confirm('Sunteți sigur că doriți să ștergeți acest utilizator?')) return;

    this.serviciuUtilizatori.stergeUtilizator(this.idUtilizator);
    this.ruta.navigate(['/administrator/utilizatori']);
  }

  inapoi() {
    this.ruta.navigate(['/administrator/utilizatori']);
  }
}
