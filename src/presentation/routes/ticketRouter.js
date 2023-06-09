import { Router } from "express";
import auth from "../middlewares/auth.js";
import TicketController from "../controllers/ticketController.js";



const ticketRouter = Router();

ticketRouter.get('/:tid',auth,TicketController.getOne);
ticketRouter.post('/:cid',auth,TicketController.create);

export default ticketRouter;