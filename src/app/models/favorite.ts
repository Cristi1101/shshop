import { CosDeCumparaturiIndividual } from './cos-de-cumparaturi-individual';

export class Favorite {

    items?: CosDeCumparaturiIndividual[] = [];

    constructor(public itemsMap: { [productId: string]: CosDeCumparaturiIndividual }) {
        this.itemsMap = itemsMap || {};

        // tslint:disable-next-line:forin prefer-const
        for (let productId in itemsMap) {
            // tslint:disable-next-line:prefer-const
            const item = itemsMap[productId];
            this.items.push(new CosDeCumparaturiIndividual(item.product, item.quantity));
        }
    }

    get totalItemsCount(): number {
        let count = 0;
        // tslint:disable-next-line:forin prefer-const
        for (let productId in this.itemsMap) {
            count += this.itemsMap[productId].quantity;
        }
        return count;
    }

}