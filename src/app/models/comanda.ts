import { CosDeCumparaturi } from './cos-de-cumparaturi';

export class Comanda {
    datePlaced: number;
    item: any[];
    orderStatus: string;

    constructor(public userId: string, public shipping: any, shoppingCart: CosDeCumparaturi) {
        this.datePlaced = new Date().getTime();
        this.item = shoppingCart.items;
        this.orderStatus = "Order and payment received.";
    }

}