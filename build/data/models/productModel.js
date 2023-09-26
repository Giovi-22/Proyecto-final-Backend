"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const productsCollection = 'products';
const productSchema = new mongoose_1.default.Schema({
    title: { type: String, require: true, index: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    thumbnail: [{ type: String, require: true }],
    stock: { type: Number, require: true },
    code: { type: String, require: true, index: true },
    status: { type: Boolean, require: true, index: true },
    category: { type: String, require: true, index: true }
});
productSchema.plugin(mongoose_paginate_v2_1.default);
exports.productModel = mongoose_1.default.model(productsCollection, productSchema);
