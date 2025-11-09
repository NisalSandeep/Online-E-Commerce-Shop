class Cart {
    constructor(items = []) {
        this.items = items;
    }

    addItem(product){
        const cartItem = {
            product: product,
            quantity: 1,
            totalprice: product.price
        };
        
        for (let i = 0; i < this.items.length; i++) {
           const item = this.items[i];
           if(item.product.id === product.id){
            cartItem.quantity = cartItem.quantity + 1;
            cartItem.totalprice = cartItem.totalprice + product.price;
            this.items[i] = cartItem;
            return;
           }
        }
        this.items.push(cartItem);
    }
}