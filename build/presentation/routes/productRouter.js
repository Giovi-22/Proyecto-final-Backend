"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const authorization_1 = require("../middlewares/authorization");
const productController_1 = __importDefault(require("../controllers/productController"));
const productRouter = (0, express_1.Router)();
productRouter.post('/', auth_1.default, (0, authorization_1.authorization)('addProduct'), productController_1.default.addProduct); // <agrega un nuevo producto a la base de datos>
productRouter.get('/', productController_1.default.getProducts); // <esta ruta funciona con paginate, se le pasan por query params los filtros: http://localhost:8083/api/products?limit=1&page=1&sort=1&filter='<productField>':'<value>'
productRouter.get('/:pid', productController_1.default.getOneProduct); // <devuelve el producto seleccionado por pid>
productRouter.put('/:pid', auth_1.default, (0, authorization_1.authorization)('updateProduct'), productController_1.default.updateProduct); // <actualiza los campos del producto seleccionado por pid. los campos se pasan por body: {'<productField>':<value>}>
productRouter.delete('/:pid', auth_1.default, (0, authorization_1.authorization)('deleteProduct'), productController_1.default.deleteProduct); // <establece el campo 'status = false' del producto seleccionado por pid>
exports.default = productRouter;
