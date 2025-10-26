const db = require('../data/database');

class Product {
    constructor(productData) {
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = productData.price;
        this.description = productData.description;
        this.image = productData.image; // name of the image file
        this.imagePath = `product-data/image/${productData.image}`; // path to the image file
        this.imageUrl = `/products/assets/images/${productData.image}`; // URL to access the image
    }

    async save() {
        const productData = {
            

        };
        db.getDb().collection('products').insertOne({

        })
    }
}


module.exports = Product; 