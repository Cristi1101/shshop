import { Produs } from './produs';

export class CosDeCumparaturiIndividual {
    constructor(public product: Produs, public quantity: number) {
    }

    get totalPrice() { return this.product.price * this.quantity; }
}