import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciuDeAutentificare } from '../serviciu-de-autentificare.service';
import { Utilizator } from '../models/utilizator';
import { ServiciuUtilizatori } from '../serviciu-utilizatori.service';
import { ServiciuCosDeCumparaturi } from '../serviciu-cos-de-cumparaturi.service';
import { CosDeCumparaturi } from '../models/cos-de-cumparaturi';
import { Subscription } from 'rxjs/Subscription';
import { ServiciuComenzi } from '../serviciu-comenzi.service';
// import 'rxjs/add/operators/map';
import { Comanda } from '../models/comanda';

declare var paypal;

@Component({
  selector: 'trimite-comanda',
  templateUrl: './trimite-comanda.component.html',
  styleUrls: ['./trimite-comanda.component.css']
})
export class TrimiteComanda implements OnInit, OnDestroy {
  utilizator: Utilizator;
  idUtilizator = localStorage.getItem('userUID');
  cosDeCumparaturi: CosDeCumparaturi;
  subscription: Subscription;

  evidentaProduselorDinCos: number;
  cosDeCumparaturi2$;
  cosDeCumparaturi2: CosDeCumparaturi = new CosDeCumparaturi(null);
  pretulTotal: number;

  @ViewChild('paypal', { static: true }) elementulPayPal: ElementRef;

  constructor(
    private ruta: Router,
    public serviciuDeAutentificare: ServiciuDeAutentificare,
    private serviciuCosDeCumparaturi: ServiciuCosDeCumparaturi,
    private serviciuComenzi: ServiciuComenzi) {
    this.serviciuDeAutentificare.utilizator$.subscribe(utilizator => {
      if (utilizator) {
        this.utilizator = utilizator;
      }
    });
  }

  platit = false;

  async ngOnInit() {
    let cosDeCump$ = await this.serviciuCosDeCumparaturi.primesteCosulDeCumparaturi();
    this.subscription = cosDeCump$.valueChanges().subscribe((cart: CosDeCumparaturi) => this.cosDeCumparaturi = cart);
    this.cosDeCumparaturi2$ = await this.serviciuCosDeCumparaturi.primesteCosulDeCumparaturi();
    this.cosDeCumparaturi2$.valueChanges().subscribe((cos) => {
      let date: any;
      date = cos.items;
      this.cosDeCumparaturi2 = new CosDeCumparaturi(date);
      this.evidentaProduselorDinCos = this.cosDeCumparaturi2.totalItemsCount;
      this.pretulTotal = this.cosDeCumparaturi2.totalPrice;
    });

    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.cosDeCumparaturi.totalItemsCount,
                amount: {
                  value: parseFloat((this.cosDeCumparaturi2.totalPrice / 4.26).toString()).toFixed(2)
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const ord = await actions.order.capture();
          this.platit = true;
          console.log(ord);
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.elementulPayPal.nativeElement);
  }

  async plaseazaComanda() {
    let comanda = new Comanda(this.idUtilizator, this.utilizator, this.cosDeCumparaturi);
    let rezultat = await this.serviciuComenzi.plaseazaComanda(comanda);

    this.ruta.navigate(['/order-success/', rezultat.key]);
  }

  inapoi() {
    this.ruta.navigate(['/shopping-cart']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
