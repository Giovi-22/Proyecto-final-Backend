import { Router } from "express";

import SessionController from "../controllers/sessionController";
import auth from "../middlewares/auth";

const sessionsRouter = Router();


sessionsRouter.post('/login',SessionController.login);
sessionsRouter.get('/current',auth,SessionController.current);
sessionsRouter.post('/signup',SessionController.signup);
sessionsRouter.post('/logout',SessionController.logout);
sessionsRouter.post('/forgotpassword',SessionController.forgotPassword);
sessionsRouter.get('/changepassword/:token',SessionController.changePassword);
sessionsRouter.put('/restorepassword',SessionController.restorePassword)

export default sessionsRouter;