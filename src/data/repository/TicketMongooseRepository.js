import Ticket from "../../domain/entities/Ticket.js";
import { TicketModel } from "../models/ticketModel.js";


class TicketMongooseRepository{

    async create(ticket)
    {
        const newTicket= await TicketModel.create(ticket.getData());
        await TicketModel.populate(newTicket,"products.pid");

        return new Ticket({
            id: newTicket._id,
            code: newTicket.code,
            purchase_datetime: newTicket.purchase_datetime,
            amount: newTicket.amount,
            purchaser: newTicket.purchaser,
            products : newTicket.products
        }) 

    }

    async findById(tid)
    {
        const ticket = await TicketModel.findById(tid).populate("products.pid");
        return new Ticket({
            id: ticket._id,
            code: ticket.code,
            purchase_datetime: ticket.purchase_datetime,
            amount: ticket.amount,
            purchaser: ticket.purchaser,
            products: ticket.products
        })
    }
    
}

export default TicketMongooseRepository;