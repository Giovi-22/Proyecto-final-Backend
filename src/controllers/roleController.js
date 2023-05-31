import { idValidation } from "../helpers/validators.js";
import RoleManager from "../managers/RoleManager.js";

class RoleController{

    static async insert(req,res,next)
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
            idValidation.parse(req.params.rid);
            const roleM = new RoleManager();
            const role = await roleM.findOne(req.params.rid);
            res.status(200).send({status:'succsess',data:role})
        } 
        catch (error) 
        {
            next(error);
        }
    }

    static async update(req,res,next)
    {
        try 
        {
            idValidation.parse(req.params.rid);
            const roleM = new RoleManager();
            const updatedRole = await roleM.update(req.params.rid,req.body);
            res.status(200).send({status:'succsess',data:updatedRole})
        } 
        catch (error) 
        {
            next(error);
        }
    }
}



export default RoleController;