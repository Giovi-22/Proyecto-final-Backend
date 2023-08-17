import { Router } from 'express';

import auth from '../middlewares/auth.js';
import UserController from '../controllers/userController.js';
import { authorization } from '../middlewares/authorization.js';
import { uploader } from '../../helpers/multer.js';

const userRouter = Router();


userRouter.get('/list',auth,authorization('getList'),UserController.list);
userRouter.get('/:uid',auth,authorization('getOne'),UserController.getOne);              
userRouter.post('/',auth,authorization('create'),UserController.create);   
userRouter.post('/premium/:uid',auth,authorization('changerole'),UserController.changeRole);
userRouter.post('/file',uploader.single('file') ,UserController.uploadFile);
userRouter.put('/:uid',auth,authorization('updateOne'),UserController.updateOne);
userRouter.delete('/:uid',auth,authorization('deleteOne'),UserController.deleteOne);


export default userRouter;