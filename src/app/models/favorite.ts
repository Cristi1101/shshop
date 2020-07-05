import { CosDeCumparaturiIndividual } from './cos-de-cumparaturi-individual';

export class Favorite {

    elemente?: CosDeCumparaturiIndividual[] = [];

    constructor(public mapareElemente: { [idProdus: string]: CosDeCumparaturiIndividual }) {
        this.mapareElemente = mapareElemente || {};

        for (let idProdus in mapareElemente) {
            const element = mapareElemente[idProdus];
            this.elemente.push(new CosDeCumparaturiIndividual(element.produs, element.cantitate));
        }
    }
}