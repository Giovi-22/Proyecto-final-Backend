import { Router } from 'express';

import auth from '../middlewares/auth.js';
import UserController from '../controllers/userController.js';
import { authorization } from '../middlewares/authorization.js';
import { uploadFiles } from '../../helpers/multer.js';

const userRouter = Router();
const fileTypes = [
    {
        name:'profiles',
        maxCount: 1,
    },
    {
        name:'products',
        maxCount: 3,
    },
    {
        name:'documents',
        maxCount: 4
    }
]

userRouter.post('/',auth,authorization('create'),UserController.create);   
userRouter.get('/:uid',auth,authorization('getOne'),UserController.getOne);
userRouter.put('/:uid',auth,authorization('updateOne'),UserController.updateOne);
userRouter.delete('/:uid',auth,authorization('deleteOne'),UserController.deleteOne);              
userRouter.post('/:uid/documents',auth,uploadFiles("src/public/assets").fields(fileTypes),UserController.loadDocuments);
userRouter.get('/list',auth,authorization('getList'),UserController.list);
userRouter.post('/premium/:uid',auth,authorization('changerole'),UserController.changeRole);



export default userRouter;