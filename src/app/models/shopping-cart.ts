import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {

    items = [];

    constructor(public itemsMap : ShoppingCartItem[]) {
        for(let productid in itemsMap){
            let item = itemsMap[productid];
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    }

    get totalCount() {
        let count = 0;
       for(let productid in this.itemsMap) {
        count += this.itemsMap[productid].quantity;
       }
       return count;
    }

    get totalPrice() {
        let sum = 0;
        for(let productid in this.items){
            sum += this.items[productid].totalPrice;
        }
        return sum;
    }

    getProductQuan(product) {
        let item = this.itemsMap[product.key];
        return item ? item.quantity : 0;
      }

}