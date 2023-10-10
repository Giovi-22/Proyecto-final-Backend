
import { NextFunction, Response } from "express";
import RoleManager from "../../domain/managers/RoleManager";
import { IRequest } from "../../shared/Interfaces/custom.interfaces.js";

class RoleController{

    static async create(req:IRequest,res:Response,next:NextFunction)
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

    static async getOne(req:IRequest,res:Response,next:NextFunction)
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

    static async updatePermissions(req:IRequest,res:Response,next:NextFunction)
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

    static async deletePermission(req:IRequest,res:Response,next:NextFunction)
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