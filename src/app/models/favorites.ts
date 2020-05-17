import { FavouriteItems } from './favourites-item';

export class ShoppingCart {

    items?: FavouriteItems[] = [];

    constructor(public itemsMap: { [productId: string]: FavouriteItems}) {
        this.itemsMap = itemsMap || {};

        for (let productId in itemsMap) {
            const item = itemsMap[productId];
            this.items.push(new FavouriteItems(item.product));
        }
    }

}