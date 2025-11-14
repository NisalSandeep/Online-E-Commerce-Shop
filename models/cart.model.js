class Cart {
    constructor(items = [], toatlQuantity = 0, totalPrice = 0) {
        this.items = items;
        this.toatlQuantity = toatlQuantity;
        this.totalPrice = totalPrice;
    }

    addItem(product) {
        const cartItem = {
            product: product,
            quantity: 1,
            totalprice: product.price
        };

        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (item.product.id === product.id) {
                cartItem.quantity = cartItem.quantity + 1;
                cartItem.totalprice = cartItem.totalprice + product.price;
                this.items[i] = cartItem;

                this.toatlQuantity++;
                this.totalPrice = this.price + product.price;
                return;
            }
        }
        this.items.push(cartItem);
        this.toatlQuantity++;
        this.totalPrice = this.price + product.price;  
    }
}

module.exports = Cart;