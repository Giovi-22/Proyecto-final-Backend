import { Router } from "express";
import auth from "../middlewares/auth.js";
import { authorization } from "../middlewares/authorization.js";
import TicketController from "../controllers/ticketController.js";



const ticketRouter = Router();

ticketRouter.post('/:cid',auth,TicketController.create);


export default ticketRouter;