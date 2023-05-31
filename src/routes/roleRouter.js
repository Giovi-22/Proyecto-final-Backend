import { Router } from "express";
import RoleController from "../controllers/roleController.js";
import auth from "../middlewares/auth.js";
import { authorization } from "../middlewares/authorization.js";

const roleRouter = Router();


roleRouter.post('/',auth,authorization('insertRole'),RoleController.insert);
roleRouter.get('/:rid',auth,authorization('getOneRole'),RoleController.getOne);
roleRouter.put('/:rid',auth,authorization('updatePermissions'),RoleController.updatePermissions);
roleRouter.delete('/:rid',auth,authorization('deletePermission'),RoleController.deletePermission);

export default roleRouter;