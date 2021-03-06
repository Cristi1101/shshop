import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular7-data-table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng5SliderModule } from 'ng5-slider';

import { Autentificare } from './autentificare/autentificare.component';
import { Inregistrare } from './inregistrare/inregistrare.component';

import { BaraDeNavigatie } from './bara-de-navigatie/bara-de-navigatie.component';
import { PaginaPrincipala } from './pagina-principala/pagina-principala.component';
import { ContulMeu } from './contul-meu/contul-meu.component';
import { ContulMeuModificari } from './contul-meu-modificari/contul-meu-modificari.component';
import { CatalogulProduselor } from './produse/catalogul-produselor.component';
import { Produse } from './produse/compozitie-produse/produse.component';
import { FiltruProduse } from './produse/filtru-produse/filtru-produse.component';
import { DetaliiProduse } from './produse/detalii-produse/detalii-produse.component';
import { CosulDeCumparaturi } from './cosul-de-cumparaturi/cosul-de-cumparaturi.component';
import { TrimiteComanda } from './trimite-comanda/trimite-comanda.component';
import { RezumatCosDeCumparaturi } from './rezumat-cos-de-cumparaturi/rezumat-cos-de-cumparaturi.component';
import { ComandaEfectuata } from './trimite-comanda/comanda-efectuata/comanda-efectuata.component';
import { ComenzileMele } from './comenzile-mele/comenzile-mele.component';
import { ComenzileMeleDetalii } from './comenzile-mele/comenzile-mele-detalii/comenzile-mele-detalii.component';
import { RecenziileMele } from './recenziile-mele/recenziile-mele.component';
import { RecenziileMeleModificare } from './recenziile-mele/recenziile-mele-verificare/recenziile-mele-verificare.component';
import { Favorite } from './favorite/favorite.component';

import { AdministrareProduse } from './admin/administrare-produse/administrare-produse.component';
import { AdministrareProduseCreare } from './admin/administrare-produse-creare/administrare-produse-creare.component';
import { AdministrareProduseModificare } from './admin/administrare-produse-modificare/administrare-produse-modificare.component';
import { AdministrareComenzi } from './admin/administrare-comenzi/administrare-comenzi.component';
import { AdministrareComenziDetalii } from './admin/administrare-comenzi-detalii/administrare-comenzi-detalii.component';
import { AdministrareUtilizatori } from './admin/administrare-utilizatori/administrare-utilizatori.component';
import { AdministrareUtilizatoriDetalii } from './admin/administrare-utilizatori-detalii/administrare-utilizatori-detalii.component';
import { AdministrareRecenzii } from './admin/administrare-recenzii/administrare-recenzii.component';

import { ProtectieLinkUtilizator } from './protectie-link-utilizator.service';
import { ProtectieLinkAdmin } from './protectie-link-admin.service';

import { ServiciuDeAutentificare } from './serviciu-de-autentificare.service';
import { ServiciuUtilizatori } from './serviciu-utilizatori.service';
import { ServiciuCategorii } from './serviciu-categorii.service';
import { ServiciuProduse } from './serviciu-produse.service';
import { ServiciuCosDeCumparaturi } from './serviciu-cos-de-cumparaturi.service';
import { ServiciuCulori } from './serviciu-culori.service';
import { ServiciuSubcategorii } from './serviciu-subcategorii.service';
import { ServiciuComenzi } from './serviciu-comenzi.service';
import { ServiciuRecenzii } from './serviciu-recenzii.service';
import { ServiciuStareaComenzii } from './serviciu-starea-comenzii.service';
import { ServiciuFavorite } from './serviciu-favorite.service';

@NgModule({
  declarations: [
    AppComponent,
    BaraDeNavigatie,
    PaginaPrincipala,
    CatalogulProduselor,
    FiltruProduse,
    Produse,
    DetaliiProduse,
    Autentificare,
    Inregistrare,
    CosulDeCumparaturi,
    RezumatCosDeCumparaturi,
    TrimiteComanda,
    ComandaEfectuata,
    ComenzileMele,
    AdministrareProduse,
    AdministrareComenzi,
    AdministrareComenziDetalii,
    AdministrareProduseModificare,
    AdministrareProduseCreare,
    AdministrareUtilizatori,
    AdministrareUtilizatoriDetalii,
    AdministrareRecenzii,
    ContulMeu,
    ContulMeuModificari,
    ComenzileMeleDetalii,
    RecenziileMele,
    RecenziileMeleModificare,
    Favorite
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    DataTableModule,
    NgbModule,
    Ng5SliderModule,
    RouterModule.forRoot([
      {path: '', component: PaginaPrincipala},
      {path: 'catalog-de-produse', component: CatalogulProduselor},
      {path: 'produs/:id', component: DetaliiProduse},
      {path: 'cos-de-cumparaturi', component: CosulDeCumparaturi},
      {path: 'autentificare', component: Autentificare},
      {path: 'inregistrare', component: Inregistrare},
      
      {path: 'contul-meu', component: ContulMeu, canActivate: [ProtectieLinkUtilizator]},
      {path: 'contul-meu/modificare', component: ContulMeuModificari, canActivate: [ProtectieLinkUtilizator]},
      {path: 'plasare-comanda', component: TrimiteComanda, canActivate: [ProtectieLinkUtilizator]},
      {path: 'plasare-comanda/comanda-efectuata/:id', component: ComandaEfectuata, canActivate: [ProtectieLinkUtilizator]},
      {path: 'comenzile-mele', component: ComenzileMele, canActivate: [ProtectieLinkUtilizator]},
      {path: 'comenzile-mele/:id', component: ComenzileMeleDetalii, canActivate: [ProtectieLinkUtilizator]},
      {path: 'recenzii', component: RecenziileMele, canActivate: [ProtectieLinkUtilizator]},
      {path: 'recenzii/:id', component: RecenziileMeleModificare, canActivate: [ProtectieLinkUtilizator]},
      {path: 'favorite', component: Favorite, canActivate: [ProtectieLinkUtilizator]},

      {path: 'administrator/produs/nou', component: AdministrareProduseCreare, canActivate: [ProtectieLinkUtilizator, ProtectieLinkAdmin]},
      {path: 'administrator/produs/:id', component: AdministrareProduseModificare, canActivate: [ProtectieLinkUtilizator, ProtectieLinkAdmin]},
      {path: 'administrator/produs', component: AdministrareProduse, canActivate: [ProtectieLinkUtilizator, ProtectieLinkAdmin]},
      {path: 'administrator/comenzi', component: AdministrareComenzi, canActivate: [ProtectieLinkUtilizator, ProtectieLinkAdmin]},
      {path: 'administrator/comenzi/:id', component: AdministrareComenziDetalii, canActivate: [ProtectieLinkUtilizator, ProtectieLinkAdmin]},
      {path: 'administrator/recenzii', component: AdministrareRecenzii, canActivate: [ProtectieLinkUtilizator, ProtectieLinkAdmin]},
      {path: 'administrator/utilizatori', component: AdministrareUtilizatori, canActivate: [ProtectieLinkUtilizator, ProtectieLinkAdmin]},
      {path: 'administrator/utilizatori/:id', component: AdministrareUtilizatoriDetalii, canActivate: [ProtectieLinkUtilizator, ProtectieLinkAdmin]}
    ])
  ],
  providers: [
    ServiciuDeAutentificare,
    ProtectieLinkUtilizator,
    ProtectieLinkAdmin,

    ServiciuUtilizatori,
    ServiciuCategorii,
    ServiciuCulori,
    ServiciuSubcategorii,
    ServiciuProduse,
    ServiciuCosDeCumparaturi,
    ServiciuComenzi,
    ServiciuRecenzii,
    ServiciuStareaComenzii,
    ServiciuFavorite
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
