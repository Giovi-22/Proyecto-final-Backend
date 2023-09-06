
import EmailManager from "../../domain/managers/EmailManager.js";
import TicketManager from "../../domain/managers/TicketManager.js";


class TicketController{

    static async create(req,res,next)
    {
        try 
        {
            const ticketM = new TicketManager();
            const emailM = new EmailManager();
            const newTicket = await ticketM.create(req.params.cid,req.user);
            const products = await ticketM.convertProductData(newTicket);
            await emailM.send(newTicket.purchaser,"Ticket created",{...newTicket,products},"purchase.hbs")
            res.status(200).send({status:'success',data:newTicket})
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
            res.status(200).send({status:'succsess',data:ticket})
        } 
        catch (error) 
        {
            next(error);
        }
    }


}



export default TicketController;