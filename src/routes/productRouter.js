import { Router } from "express";
import ProductController from "../controllers/productController.js";
import { productValidator } from "../middelwares/productValidator.js";

const pRouter = Router();

pRouter.post('/',productValidator,ProductController.addProduct);    // <agrega un nuevo producto a la base de datos>
pRouter.get('/',ProductController.getProducts);                     // <esta ruta funciona con paginate, se le pasan por query params los filtros: http://localhost:8083/api/products?limit=1&page=1&sort=1&filter="<productField>":"<value>"
pRouter.get('/:pid',ProductController.getOneProduct);               // <devuelve el producto seleccionado por pid>
pRouter.put('/:pid',ProductController.updateProduct);               // <actualiza los campos del producto seleccionado por pid. los campos se pasan por body: {"<productField>":<value>}>
pRouter.delete('/:pid',ProductController.deleteProduct);            // <establece el campo "status = false" del producto seleccionado por pid>

export default pRouter;