import { Router } from "express";
import TestController from "../controllers/testController";

const testRouter = Router();


testRouter.get('/',TestController.testGet);
testRouter.post('/new',TestController.newData);
testRouter.get('/cart',TestController.getCart);
testRouter.put('/:cid',TestController.updateCart);
testRouter.get('/:cid',TestController.findById);
export default testRouter;