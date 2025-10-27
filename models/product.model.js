const db = require('../data/database');
const mongodb = require('mongodb');

class Product {
    constructor(productData) {
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = +productData.price;
        this.description = productData.description;
        this.image = productData.image; // name of the image file
        this.updateImageData();
        if (productData._id) {
            this.id = productData._id.toString();
        }

    }
    static async findById(productId) {
        let prodId;
        try {
            prodId = new mongodb.ObjectId(productId);
        } catch (error) {
            error.statusCode = 404;
            throw error;
        }

        const product = await db.getDb().collection('products').findOne({ _id: prodId });

        if (!product) {
            const error = new Error('Could not find product with provided id.');
            error.statusCode = 404;
            throw error;
        }
        return new Product(product);
    }
    async update() {
        db.getDb().collection('products').updateOne({ _id: new mongodb.ObjectId(this.id) }, {
            $set: {
                title: this.title,
                summary: this.summary,
                price: this.price,
                description: this.description,
                image: this.image
            }
        });
    }

    static async findAll() {
        const products = await db.getDb().collection('products').find().toArray();

        return products.map(function (productDocument) {
            return new Product(productDocument);
        });
    }

    updateImageData() {
        this.imagePath = `product-data/image/${this.image}`; // path to the image file
        this.imageUrl = `/products/assets/images/${this.image}`; // URL to access the image
    }

    async save() {
        const productData = {
            title: this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image

        };

        if (this.id) {

            if( !this.image) {
                delete productData.image;
            }
            db.getDb().collection('products').updateOne({ _id: new mongodb.ObjectId(this.id) }, { $set: productData });
        } else {
            await db.getDb().collection('products').insertOne({ ...productData });
        }
    }

    replaceImage(newImage) {
        this.image = newImage;
        this.updateImageData();
    }
}


module.exports = Product; 