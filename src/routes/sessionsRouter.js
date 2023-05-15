import { Router } from "express";

import SessionController from "../controllers/sessionController.js";

const sessionsRouter = Router();


sessionsRouter.post('/login',SessionController.login);
sessionsRouter.post('/signup',SessionController.signup);
sessionsRouter.post('/logout',SessionController.logout);


export default sessionsRouter;