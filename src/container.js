import { Lifetime, asClass, createContainer } from "awilix";
import UserMongooseDAO from "./data/daos/userMongooseDAO.js";
import ProductMongooseDAO from "./data/daos/productMongooseDAO.js";
import CartMongooseDAO from "./data/daos/cartMongooseDAO.js";
import RoleRepository from "./data/repository/RoleRepository.js";


const container = createContainer();

container.register('UserDao', asClass(UserMongooseDAO),{lifetime: Lifetime.SINGLETON});
container.register('ProductDao', asClass(ProductMongooseDAO),{lifetime: Lifetime.SINGLETON});
container.register('CartDao', asClass(CartMongooseDAO),{lifetime: Lifetime.SINGLETON});
container.register('RoleRepository', asClass(RoleRepository),{lifetime: Lifetime.SINGLETON});

export default container;

