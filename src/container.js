import { Lifetime, asClass, createContainer } from "awilix";
import UserMongooseDAO from "./data/daos/userMongooseDAO.js";
import RoleDAO from "./data/daos/RoleDAO.js";
import ProductMongooseDAO from "./data/daos/productMongooseDAO.js";


const container = createContainer();

container.register('UserDao', asClass(UserMongooseDAO),{lifetime: Lifetime.SINGLETON});
container.register('ProductDao', asClass(ProductMongooseDAO),{lifetime: Lifetime.SINGLETON});
container.register('RoleDao', asClass(RoleDAO),{lifetime: Lifetime.SINGLETON});

export default container;

