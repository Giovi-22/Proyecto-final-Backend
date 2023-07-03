
import TicketManager from "../../domain/managers/TicketManager.js";

class TicketController{

    static async create(req,res,next)
    {
        try 
        {
            const ticketM = new TicketManager();
            const newTicket = await ticketM.create(req.params.cid,req.user.email);
            console.log("Ticket: ",newTicket);
            res.status(201).send({status:'success',data:newTicket})
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
            const role = await ticketM.getOne(req.params.rid);
            res.status(200).send({status:'succsess',data:role})
        } 
        catch (error) 
        {
            next(error);
        }
    }

    static async updatePermissions(req,res,next)
    {
        const permission = req.body?.permission;
        try 
        {
            const ticketM = new TicketManager();
            const updatedRole = await ticketM.addPermission(req.params.rid,permission);
            res.status(200).send({status:'succsess',data:updatedRole})
        } 
        catch (error) 
        {
            next(error);
        }
    }

    static async deletePermission(req,res,next)
    {
        const permission = req.body?.permission;
        try 
        {
            const ticketM = new TicketManager();
            const updatedRole = await ticketM.deletePermission(req.params.rid,permission);
            res.status(200).send({status:'succsess',data:updatedRole})
        } 
        catch (error) 
        {
            next(error);
        }
    }
}



export default TicketController;