
import EmailManager from "../../domain/managers/EmailManager.js";
import TicketManager from "../../domain/managers/TicketManager.js";


class TicketController{

    static async create(req,res,next)
    {
        try 
        {
            const ticketM = new TicketManager();
            const emailM = new EmailManager();
            const newTicket = await ticketM.create(req.params.cid,req.user.email);
            const products = await ticketM.convertProductData(newTicket.getData());
            await emailM.send(newTicket.getData().purchaser,"Ticket created",{...newTicket.getData(),products},"purchase.hbs")
            res.status(200).send({status:'success',data:newTicket.getData()})
        } 
        catch (error) 
        {
            next(error);
        }
    }

    static async getOne(req,res,next)
    {
        try 
        {
            const ticketM = new TicketManager();
            const ticket = await ticketM.getOne(req.params.tid)
            res.status(200).send({status:'succsess',data:ticket.getData()})
        } 
        catch (error) 
        {
            next(error);
        }
    }


}



export default TicketController;