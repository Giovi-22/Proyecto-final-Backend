import { Router } from "express";

const roleRouter = Router();


roleRouter.post('/',roleController.insert);
roleRouter.get('/:rid',roleController.getOne);

export default roleRouter;