"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const awilix_1 = require("awilix");
//import UserMongooseDAO from "./data/daos/userMongooseDAO.js";
//import ProductMongooseDAO from "./data/daos/productMongooseDAO.js";
//import CartMongooseDAO from "./data/daos/cartMongooseDAO.js";
//import RoleRepository from "./data/repository/RoleRepository.js";
//import CartMongooseRepository from "./data/repository/CartMongooseRepository.js";
const ProductMongooseRepository_1 = __importDefault(require("./data/repository/ProductMongooseRepository"));
//import UserMongooseRepository from "./data/repository/UserMongooseRepository.js";
//import TicketMongooseRepository from "./data/repository/TicketMongooseRepository.js";
//import CartManager from "./domain/managers/CartManager.js";
const container = (0, awilix_1.createContainer)();
/*
//--------------------------DAOS----------------------------------------------------
container.register({
    UserDao: asClass(UserMongooseDAO,{lifetime:Lifetime.SINGLETON}),
    ProductDao: asClass(ProductMongooseDAO,{lifetime:Lifetime.SINGLETON}),
    CartDao: asClass(CartMongooseDAO,{lifetime:Lifetime.SINGLETON})
})
*/
//-----------------------REPOSITORIES-------------------------------------------------
container.register({
    //RoleRepository: asClass(RoleMongooseRepository,{lifetime:Lifetime.SINGLETON}),
    //CartRepository: asClass(CartMongooseRepository,{lifetime:Lifetime.SINGLETON}),
    ProductRepository: (0, awilix_1.asClass)(ProductMongooseRepository_1.default, { lifetime: awilix_1.Lifetime.SINGLETON }),
    //UserRepository: asClass(UserMongooseRepository,{lifetime:Lifetime.SINGLETON}),
    //TicketRepository: asClass(TicketMongooseRepository,{lifetime:Lifetime.SINGLETON}),
});
//----------------------MANAGERS--------------------------------------------------------
/*
container.register(
    {
        cartManager: asClass(CartManager,{lifetime:Lifetime.SINGLETON})
    }
);
*/
exports.default = container;
