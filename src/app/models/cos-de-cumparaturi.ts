import { CosDeCumparaturiIndividual } from './cos-de-cumparaturi-individual';

export class CosDeCumparaturi {

    items?: CosDeCumparaturiIndividual[] = [];

    constructor(public itemsMap: { [productId: string]: CosDeCumparaturiIndividual }) {
        this.itemsMap = itemsMap || {};

        for (let productId in itemsMap) {
            const item = itemsMap[productId];
            this.items.push(new CosDeCumparaturiIndividual(item.product, item.quantity));
        }
    }

    get totalItemsCount(): number {
        let count = 0;
        for (let productId in this.itemsMap) {
            count += this.itemsMap[productId].quantity;
        }
        if(count == 1) window.location.reload();
        return count;
    }

    get totalPrice(): number {
        let sum = 0;
        for (let productId in this.items) {
            sum += this.items[productId].totalPrice;
        }
        return sum;
    }
}