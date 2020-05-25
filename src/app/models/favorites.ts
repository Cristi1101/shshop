import { ShoppingCartItem } from './shopping-cart-item';

export class Favorites {

    items?: ShoppingCartItem[] = [];

    constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || {};

        // tslint:disable-next-line:forin prefer-const
        for (let productId in itemsMap) {
            // tslint:disable-next-line:prefer-const
            const item = itemsMap[productId];
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
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