import { ShoppingCart } from './shopping-cart';

export class Order {
    datePlaced: number;
    total: number;
    item: any[];

    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();
        //this.total = shoppingCart.totalPrice;
        this.item = shoppingCart.items;
        
    }
    
}