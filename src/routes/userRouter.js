import { Router } from "express";

import auth from "../middlewares/auth.js";
import UserController from "../controllers/userController.js";

const userRouter = Router();


userRouter.get('/list',UserController.list);
userRouter.get('/:uid',UserController.getOne);              
userRouter.post('/',auth,UserController.create);            //ruta privada
userRouter.put('/:uid',auth,UserController.updateOne);
userRouter.delete('/:uid',auth,UserController.deleteOne);

export default userRouter;