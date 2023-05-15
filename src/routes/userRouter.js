import { Router } from "express";

import auth from "../middlewares/auth.js";
import UserController from "../controllers/userController.js";

const userRouter = Router();


userRouter.get('/list',UserController.list);
userRouter.get('/:uid',UserController.getOne);              
userRouter.post('/',auth,UserController.insert);            //ruta privada
userRouter.put('/:uid',UserController.updateOne);
userRouter.delete('/:uid',UserController.deleteOne);

export default userRouter;