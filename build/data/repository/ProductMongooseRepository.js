"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../../domain/entities/Product/Product"));
const productModel_1 = require("../models/productModel");
class ProductMongooseRepository {
    insertOne(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = yield productModel_1.productModel.create(product);
            return new Product_1.default({
                id: newProduct._id,
                title: newProduct.title,
                description: newProduct.description,
                price: newProduct.price,
                thumbnail: newProduct.thumbnail,
                stock: newProduct.stock,
                code: newProduct.code,
                status: newProduct.status,
                category: newProduct.category
            });
        });
    }
    findByFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield productModel_1.productModel.find(filter);
            return products.map(product => new Product_1.default(product));
        });
    }
    /*
        async Paginate(filters:IPaginationFilters)
        {
            const options = {
                limit: filters.limit,
                page: filters.page,
                sort:{'price':filters.sort,'_id':1}, //condicion requerida en la entrega
            }
            //Model.paginate([query],[options],[callback])
            const result = await productModel.paginate(filter,options);
            Object.assign(result,
                {docs: result.docs.map(product => new Product({
                    id: product._id.toString(),
                    title: product.title,
                    description: product.description,
                    category: product.category,
                    price: product.price,
                    stock: product.stock,
                    thumbnail: product.thumbnail,
                    code: product.code,
                    status: product.status
                })),
                
            });
            return result;
        }
    */
    findById(pid) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield productModel_1.productModel.findById(pid);
            if (!product) {
                throw new Error("Product don't found");
            }
            return new Product_1.default({
                id: product._id,
                title: product.title,
                description: product.description,
                category: product.category,
                price: product.price,
                thumbnail: product.thumbnail,
                stock: product.stock,
                code: product.code,
                status: product.status
            });
        });
    }
    update(pid, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const productUpdated = yield productModel_1.productModel.findOneAndUpdate({ _id: pid }, data, { new: true });
            if (!productUpdated) {
                throw new Error('The update product do not found');
            }
            return new Product_1.default({
                id: productUpdated._id,
                title: productUpdated.title,
                description: productUpdated.description,
                price: productUpdated.price,
                thumbnail: productUpdated.thumbnail,
                stock: productUpdated.stock,
                code: productUpdated.code,
                status: productUpdated.status,
                category: productUpdated.category
            });
        });
    }
}
exports.default = ProductMongooseRepository;
