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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _ProductManager_ProductRepository;
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = __importDefault(require("../../container"));
const validators_1 = require("../validations/validators");
class ProductManager {
    constructor() {
        _ProductManager_ProductRepository.set(this, void 0);
        __classPrivateFieldSet(this, _ProductManager_ProductRepository, container_1.default.resolve('ProductRepository'), "f");
    }
    add(product) {
        return __awaiter(this, void 0, void 0, function* () {
            yield validators_1.productZodSchema.parseAsync(product);
            const codeExist = yield __classPrivateFieldGet(this, _ProductManager_ProductRepository, "f").findByFilter({ code: { $eq: product.code } });
            if (codeExist.length) {
                throw new Error('Bad Request, El código del producto ya existe');
            }
            const newProduct = yield __classPrivateFieldGet(this, _ProductManager_ProductRepository, "f").insertOne(product);
            return newProduct;
        });
    }
    get(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield __classPrivateFieldGet(this, _ProductManager_ProductRepository, "f").Paginate(options);
            return products;
        });
    }
    getOne(pid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield validators_1.idValidation.parseAsync(pid);
            const product = yield __classPrivateFieldGet(this, _ProductManager_ProductRepository, "f").findById(pid);
            return product;
        });
    }
    update(pid, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield validators_1.idValidation.parseAsync(pid);
            yield validators_1.productUpdateSchema.parseAsync(data);
            const updatedProduct = yield __classPrivateFieldGet(this, _ProductManager_ProductRepository, "f").update(pid, data);
            return updatedProduct;
        });
    }
    deleteOne(pid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield validators_1.idValidation.parseAsync(pid);
            const productDeleted = yield this.update(pid, { status: false });
            return productDeleted;
        });
    }
}
_ProductManager_ProductRepository = new WeakMap();
exports.default = ProductManager;
