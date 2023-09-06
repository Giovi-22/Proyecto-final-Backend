import { Router } from "express";

import auth from "../middlewares/auth.js";
import { authorization } from "../middlewares/authorization.js";
import ProductC from "../controllers/product.js";

const productRouter = Router();

productRouter.post('/',auth,authorization('addProduct'),ProductC.createProduct);    // <agrega un nuevo producto a la base de datos>
productRouter.get('/',ProductC.getProducts);                     // <esta ruta funciona con paginate, se le pasan por query params los filtros: http://localhost:8083/api/products?limit=1&page=1&sort=1&filter="<productField>":"<value>"
productRouter.get('/:pid',ProductC.getOneProduct);               // <devuelve el producto seleccionado por pid>
productRouter.put('/:pid',auth,authorization('updateProduct'),ProductC.updateProduct);               // <actualiza los campos del producto seleccionado por pid. los campos se pasan por body: {"<productField>":<value>}>
productRouter.delete('/:pid',auth,authorization('deleteProduct'),ProductC.deleteProduct);            // <establece el campo "status = false" del producto seleccionado por pid>

export default productRouter;
