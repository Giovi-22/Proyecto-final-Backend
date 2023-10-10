import { Lifetime, asClass, createContainer } from "awilix";

//import UserMongooseDAO from "./data/daos/userMongooseDAO.js";
//import ProductMongooseDAO from "./data/daos/productMongooseDAO.js";
//import CartMongooseDAO from "./data/daos/cartMongooseDAO.js";
import RoleMongooseRepository from "./data/repository/RoleMongooseRepository";
//import CartMongooseRepository from "./data/repository/CartMongooseRepository.js";
import ProductMongooseRepository from "./data/repository/ProductMongooseRepository";
import UserMongooseRepository from "./data/repository/UserMongooseRepository";
//import TicketMongooseRepository from "./data/repository/TicketMongooseRepository.js";
//import CartManager from "./domain/managers/CartManager.js";


const container = createContainer();
/*
//--------------------------DAOS----------------------------------------------------
container.register({
    UserDao: asClass(UserMongooseDAO,{lifetime:Lifetime.SINGLETON}),
    ProductDao: asClass(ProductMongooseDAO,{lifetime:Lifetime.SINGLETON}),
    CartDao: asClass(CartMongooseDAO,{lifetime:Lifetime.SINGLETON})
})
*/
//-----------------------REPOSITORIES-------------------------------------------------
container.register(
    {
        RoleRepository: asClass(RoleMongooseRepository,{lifetime:Lifetime.SINGLETON}),
        //CartRepository: asClass(CartMongooseRepository,{lifetime:Lifetime.SINGLETON}),
        ProductRepository: asClass(ProductMongooseRepository,{lifetime:Lifetime.SINGLETON}),
        UserRepository: asClass(UserMongooseRepository,{lifetime:Lifetime.SINGLETON}),
        //TicketRepository: asClass(TicketMongooseRepository,{lifetime:Lifetime.SINGLETON}),
    }
)
//----------------------MANAGERS--------------------------------------------------------
/*
container.register(
    {
        cartManager: asClass(CartManager,{lifetime:Lifetime.SINGLETON})
    }
);
*/
export default container;

