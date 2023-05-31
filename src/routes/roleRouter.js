import { Router } from "express";
import RoleController from "../controllers/roleController.js";

const roleRouter = Router();


roleRouter.post('/',RoleController.insert);
roleRouter.get('/:rid',RoleController.getOne);
roleRouter.put('/:rid',RoleController.update);

export default roleRouter;