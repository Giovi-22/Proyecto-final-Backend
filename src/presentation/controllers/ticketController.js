
import TicketManager from "../../domain/managers/TicketManager.js";

class TicketController{

    static async create(req,res,next)
    {
        try 
        {
            const ticketM = new TicketManager();
            const newTicket = await ticketM.create(req.params.cid,req.user.email);
            res.status(201).send({status:'success',data:newTicket.getData()})
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

    static async sendMail(req,res,next)
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