import { Router } from "express";
import TestController from "../controllers/testController";

const testRouter = Router();


testRouter.get('/',TestController.testGet);
testRouter.post('/new',TestController.newData);

export default testRouter;