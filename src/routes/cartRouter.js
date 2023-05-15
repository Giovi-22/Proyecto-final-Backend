import { Router } from "express";
import CartController from "../controllers/cartController.js";



const cartRouter = Router();

cartRouter.get('/',CartController.getAll);                          // <devuelve todos los productos>
cartRouter.get('/:cid',CartController.get);                         // <devuelve el carrito seleccionado pasandole por params el cid>
cartRouter.post('/',CartController.create);                         // <crea el carrito con un array products vacío>
cartRouter.post('/:cid/product/:pid',CartController.addOne);        // <agrega un producto al carrito, con quantity = 1>
cartRouter.put('/:cid/',CartController.updateCart);                 // <actualiza el carrito pasando por body los productos con el siguiente formato: [{"pid":<valor>,"quantity":<valor>},...]>
cartRouter.put('/:cid/product/:pid',CartController.updateOne);      // <actualiza el carrito pasando por body la cantidad: {"quantity":<valor>} >
cartRouter.delete('/:cid',CartController.deleteAll);                // <borra todos los productos del carrito seleccionado (cid)>
cartRouter.delete('/:cid/products/:pid',CartController.deleteOne);  // <borra del carrito (cid) el producto (pid)


export default cartRouter;