import { CosDeCumparaturi } from './cos-de-cumparaturi';

export class Comanda {
    dataPlasarii: number;
    produse: any[];
    stareaComenzii: string;

    constructor(public idUtilizator: string, public dateDeLivrare: any, cosDeCumparaturi: CosDeCumparaturi) {
        this.dataPlasarii = new Date().getTime();
        this.produse = cosDeCumparaturi.produse;
        this.stareaComenzii = "Comanda este în curs de procesare.";
    }

}