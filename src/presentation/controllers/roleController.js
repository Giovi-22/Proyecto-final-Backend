
import RoleManager from "../../domain/managers/RoleManager.js";

class RoleController{

    static async create(req,res,next)
    {
        try 
        {
            const roleM = new RoleManager();
            const newRole = await roleM.create(req.body);
            res.status(201).send({status:'Role crated',data:newRole})
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
            const roleM = new RoleManager();
            const role = await roleM.getOne(req.params.rid);
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
            const roleM = new RoleManager();
            const updatedRole = await roleM.addPermission(req.params.rid,permission);
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
            const roleM = new RoleManager();
            const updatedRole = await roleM.deletePermission(req.params.rid,permission);
            res.status(200).send({status:'succsess',data:updatedRole})
        } 
        catch (error) 
        {
            next(error);
        }
    }
}



export default RoleController;