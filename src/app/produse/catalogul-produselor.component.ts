import { Component, OnInit, OnDestroy, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ServiciuProduse } from '../serviciu-produse.service';
import { ActivatedRoute } from '@angular/router';
import { Produs } from '../models/produs';
import { switchMap } from 'rxjs/operators';
import { ServiciuCosDeCumparaturi } from '../serviciu-cos-de-cumparaturi.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'catalogul-produselor',
  templateUrl: './catalogul-produselor.component.html',
  styleUrls: ['./catalogul-produselor.component.css']
})
export class CatalogulProduselor implements OnInit, OnDestroy {
  produse: Produs[] = [];
  produseFiltrate: Produs[] = [];
  categorie: string;
  pretMinim: number;
  pretMaxim: number;
  cosDeCumparaturi: any;
  subscription: Subscription;
  cautare: string;
  ascundeSugestii: boolean = false;

  @ViewChild('cadereMeniu') cadereMeniu: ElementRef;
  @ViewChild('meniu') meniu: ElementRef;

  constructor(
    private ruta: ActivatedRoute,
    private serviciuProduse: ServiciuProduse,
    private serviciuCosDeCumparaturi: ServiciuCosDeCumparaturi,
    private r: Renderer2) {
    this.filterProducts();

    this.r.listen('window', 'click', (event: Event) => {
      if (event.target !== this.cadereMeniu.nativeElement && event.target !== this.meniu.nativeElement) {
        this.ascundeSugestii = true;
      }
    });
  }

  primesteFiltru($event) {
    this.pretMinim = $event[0];
    this.pretMaxim = $event[1];
    this.filterProducts();
  }

  filterProducts() {
    this.serviciuProduse
      .toateProdusele().pipe(
        switchMap((produse: Produs[]) => {
          this.produse = produse;
          return this.ruta.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.categorie = params.get('category');
        this.produseFiltrate = (this.categorie) ?
          this.produse.filter((p) =>
            (p.category === this.categorie && p.price >= this.pretMinim && p.price <= this.pretMaxim)
          ) : (this.pretMinim && this.pretMaxim ?
            this.produse.filter((p) =>
              (p.price >= this.pretMinim && p.price <= this.pretMaxim)
            ) : this.produse);
      });
  }

  stabilireCautare(titlu) {
    this.cautare = titlu;
    this.ascundeSugestii = true;
  }

  async ngOnInit() {
    this.subscription = (await this.serviciuCosDeCumparaturi.primesteCosulDeCumparaturi())
      .valueChanges().subscribe(cosDeCumparaturi => this.cosDeCumparaturi = cosDeCumparaturi);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
