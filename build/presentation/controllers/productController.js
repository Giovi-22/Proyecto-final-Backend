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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const ProductManager_1 = __importDefault(require("../../domain/managers/ProductManager"));
class ProductController {
}
_a = ProductController;
ProductController.addProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pManager = new ProductManager_1.default();
        const newProduct = yield pManager.add(req.body);
        res.status(201).json({ status: 'success', data: newProduct });
    }
    catch (error) {
        next(error);
    }
});
ProductController.getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e;
    const options = {
        limit: (_b = Number(req.query.limit)) !== null && _b !== void 0 ? _b : 10,
        page: (_c = Number(req.query.page)) !== null && _c !== void 0 ? _c : 1,
        sort: (_d = Number(req.query.sort)) !== null && _d !== void 0 ? _d : "",
        filter: JSON.parse(`{${(_e = req.query.filter) !== null && _e !== void 0 ? _e : ""}}`) //filter se pasa por query de la siguiente forma: "productField":"value"
    };
    try {
        const pManager = new ProductManager_1.default();
        const products = yield pManager.get(options);
        res.status(200).json(Object.assign(Object.assign({ status: 'success', payload: products.docs }, products), { docs: undefined }));
    }
    catch (error) {
        next(error);
    }
});
ProductController.getOneProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pid = req.params.pid;
    try {
        const pManager = new ProductManager_1.default();
        const product = yield pManager.getOne(pid);
        res.status(200).json({ status: 'success', data: product });
    }
    catch (error) {
        next(error);
    }
});
ProductController.updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pid = req.params.pid;
    const data = req.body;
    try {
        const pManager = new ProductManager_1.default();
        const productUpdated = yield pManager.update(pid, data);
        res.status(200).json({ status: 'success', data: productUpdated });
    }
    catch (error) {
        next(error);
    }
});
ProductController.deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pid = req.params.pid;
    try {
        const pManager = new ProductManager_1.default();
        const productDeleted = yield pManager.deleteOne(pid);
        res.status(200).json({ status: 'success', data: productDeleted });
    }
    catch (error) {
        next(error);
    }
});
exports.default = ProductController;
