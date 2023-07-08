import { Lifetime, asClass, createContainer } from "awilix";
import UserMongooseDAO from "./data/daos/userMongooseDAO.js";
import ProductMongooseDAO from "./data/daos/productMongooseDAO.js";
import CartMongooseDAO from "./data/daos/cartMongooseDAO.js";
import RoleRepository from "./data/repository/RoleRepository.js";
import CartMongooseRepository from "./data/repository/CartMongooseRepository.js";
import ProductMongooseRepository from "./data/repository/ProductMongooseRepository.js";
import UserMongooseRepository from "./data/repository/UserMongooseRepository.js";
import TicketMongooseRepository from "./data/repository/TicketMongooseRepository.js";
import CartManager from "./domain/managers/CartManager.js";


const container = createContainer();

container.register('UserDao', asClass(UserMongooseDAO),{lifetime: Lifetime.SINGLETON});
container.register('ProductDao', asClass(ProductMongooseDAO),{lifetime: Lifetime.SINGLETON});
container.register('CartDao', asClass(CartMongooseDAO),{lifetime: Lifetime.SINGLETON});

//-----------------------REPOSITORIES-------------------------------------------------
container.register('RoleRepository', asClass(RoleRepository),{lifetime: Lifetime.SINGLETON});
container.register('CartRepository', asClass(CartMongooseRepository),{lifetime: Lifetime.SINGLETON});
container.register('ProductRepository', asClass(ProductMongooseRepository),{lifetime: Lifetime.SINGLETON});
container.register('UserRepository', asClass(UserMongooseRepository),{lifetime: Lifetime.SINGLETON});
container.register('TicketRepository', asClass(TicketMongooseRepository),{lifetime: Lifetime.SINGLETON});

//----------------------MANAGERS--------------------------------------------------------
container.register('cartManager',asClass(CartManager),{lifetime:Lifetime.SINGLETON});
export default container;

