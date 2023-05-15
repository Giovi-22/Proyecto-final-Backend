import { Router } from "express";

import auth from '../middlewares/auth.js'
import SessionController from "../controllers/sessionController.js";

const sessionsRouter = Router();


sessionsRouter.post('/login',SessionController.login);
sessionsRouter.post('/signup',SessionController.signup);
sessionsRouter.post('/logout',SessionController.logout);
sessionsRouter.post('/filter',SessionController.filter);
export default sessionsRouter;