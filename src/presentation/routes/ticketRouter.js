import { Router } from "express";
import CartController from "../controllers/cartController.js";
import auth from "../middlewares/auth.js";
import { authorization } from "../middlewares/authorization.js";



const ticketRouter = Router();
               // <devuelve el carrito seleccionado pasandole por params el cid>
ticketRouter.post('/:cid',CartController.purchase);
ticketRouter.post('/',CartController.create);                         // <crea el carrito con un array products vacío>

export default ticketRouter;