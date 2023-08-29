import { Router } from "express";
import CartController from "../controllers/cartController.js";
import auth from "../middlewares/auth.js";
import { authorization } from "../middlewares/authorization.js";



const cartRouter = Router();

cartRouter.post('/',auth,CartController.create);                         // <crea el carrito con un array products vacío>
cartRouter.get('/',auth,authorization('getCarts'),CartController.getAll);// <devuelve todos los carritos>
cartRouter.get('/:cid',auth,CartController.get);                     // <devuelve el carrito seleccionado pasandole por params el cid>
cartRouter.put('/:cid',auth,CartController.updateCart);                 // <actualiza el carrito pasando por body los productos con el siguiente formato: [{"pid":<valor>,"quantity":<valor>},...]>
cartRouter.delete('/:cid',auth,CartController.deleteAll);                // <borra todos los productos del carrito seleccionado (cid)>
cartRouter.post('/:cid/purchase',auth,CartController.purchase);           // <devuelve los productos que estan disponibles y los no disponibles para comprar una vez finalizado el carrito>
cartRouter.post('/:cid/product/:pid',auth,CartController.addOne);        // <agrega un producto al carrito, con quantity = 1>
cartRouter.put('/:cid/product/:pid',auth,CartController.updateOne);      // <actualiza el carrito pasando por body la cantidad: {"quantity":<valor>} >
cartRouter.delete('/:cid/products/:pid',auth,CartController.deleteOne);  // <borra del carrito (cid) el producto (pid)


export default cartRouter;