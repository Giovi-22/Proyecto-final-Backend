import { Router } from 'express';

import auth from '../middlewares/auth.js';
import UserController from '../controllers/userController.js';
import { authorization } from '../middlewares/authorization.js';
import { uploader } from '../../helpers/multer.js';

const userRouter = Router();


userRouter.get('/list',auth,authorization('getList'),UserController.list);
userRouter.get('/:uid',auth,authorization('getOne'),UserController.getOne);              
userRouter.post('/',auth,authorization('create'),UserController.create);            //ruta privada
userRouter.put('/:uid',auth,authorization('updateOne'),UserController.updateOne);
userRouter.delete('/:uid',auth,authorization('deleteOne'),UserController.deleteOne);
userRouter.post('/file',uploader.single('file') ,UserController.uploadFile)

export default userRouter;