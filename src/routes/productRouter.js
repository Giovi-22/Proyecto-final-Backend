import { Router } from "express";
import ProductController from "../controllers/ProductController.js";

const productRouter = Router();

productRouter.post('/',ProductController.addProduct);    // <agrega un nuevo producto a la base de datos>
productRouter.get('/',ProductController.getProducts);                     // <esta ruta funciona con paginate, se le pasan por query params los filtros: http://localhost:8083/api/products?limit=1&page=1&sort=1&filter="<productField>":"<value>"
productRouter.get('/:pid',ProductController.getOneProduct);               // <devuelve el producto seleccionado por pid>
productRouter.put('/:pid',ProductController.updateProduct);               // <actualiza los campos del producto seleccionado por pid. los campos se pasan por body: {"<productField>":<value>}>
productRouter.delete('/:pid',ProductController.deleteProduct);            // <establece el campo "status = false" del producto seleccionado por pid>

export default productRouter;