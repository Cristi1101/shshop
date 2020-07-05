import { CosDeCumparaturiIndividual } from './cos-de-cumparaturi-individual';

export class CosDeCumparaturi {

    produse?: CosDeCumparaturiIndividual[] = [];

    constructor(public mapareProduse: { [idProdus: string]: CosDeCumparaturiIndividual }) {
        this.mapareProduse = mapareProduse || {};

        for (let idProdus in mapareProduse) {
            const element = mapareProduse[idProdus];
            this.produse.push(new CosDeCumparaturiIndividual(element.produs, element.cantitate));
        }
    }

    get totalItemsCount(): number {
        let count = 0;
        for (let idProdus in this.mapareProduse) {
            count += this.mapareProduse[idProdus].cantitate;
        }
        if(count == 1) window.location.reload();
        return count;
    }

    get totalPrice(): number {
        let sum = 0;
        for (let idProdus in this.produse) {
            sum += this.produse[idProdus].totalPrice;
        }
        return sum;
    }
}