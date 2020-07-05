import { Produs } from './produs';

export class CosDeCumparaturiIndividual {
    constructor(public produs: Produs, public cantitate: number) {
    }

    get pretulTotal() { return this.produs.pret * this.cantitate; }
}