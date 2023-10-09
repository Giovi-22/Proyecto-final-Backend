import { Router } from "express";
import TestController from "../controllers/testController";

const testRouter = Router();


testRouter.get('/',TestController.testGet);

export default testRouter;