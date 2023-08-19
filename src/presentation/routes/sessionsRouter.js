import { Router } from "express";

import SessionController from "../controllers/sessionController.js";
import auth from "../middlewares/auth.js";

const sessionsRouter = Router();


sessionsRouter.post('/login',SessionController.login);
sessionsRouter.get('/current',auth,SessionController.current);
sessionsRouter.post('/signup',SessionController.signup);    //to do: corregir, un usuario no puede setearse como admin
sessionsRouter.post('/logout',SessionController.logout);
sessionsRouter.post('/forgotpassword',SessionController.forgotPassword);
sessionsRouter.get('/changepassword-view/:token',SessionController.changePasswordView);
sessionsRouter.post('/changepassword',auth,SessionController.changePassword);

export default sessionsRouter;