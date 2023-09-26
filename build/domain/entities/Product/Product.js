"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(product) {
        this.id = product.id;
        this.title = product.title;
        this.description = product.description;
        this.category = product.category;
        this.price = product.price;
        this.stock = product.stock;
        this.thumbnail = product.thumbnail;
        this.code = product.code;
        this.status = product.status;
    }
}
exports.default = Product;
